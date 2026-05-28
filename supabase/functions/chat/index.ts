import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { detectCrisis, getCrisisResponse, sanitizeInput, isValidBanglaMessage } from "../_shared/safety.ts";
import { generateAIResponse, saveConversation, getConversationHistory, getFallbackResponse } from "../_shared/ai.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatRequest {
  message: string;
  sessionToken: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Server configuration error");
    }

    let body: ChatRequest;
    try {
      body = await req.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { message, sessionToken } = body;

    if (!message || !sessionToken) {
      return new Response(
        JSON.stringify({ error: "Message and sessionToken are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const sanitizedMessage = sanitizeInput(message);
    if (!isValidBanglaMessage(sanitizedMessage)) {
      return new Response(
        JSON.stringify({ error: "Please write in Bangla" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const crisisResult = detectCrisis(sanitizedMessage);

    if (crisisResult.isCrisis) {
      console.log("Crisis detected:", crisisResult.category, crisisResult.severity);

      const crisisResponse = getCrisisResponse();

      await saveConversation(
        supabaseUrl,
        supabaseKey,
        sessionToken,
        sanitizedMessage,
        { mood: "crisis", response: crisisResponse.reply },
        true
      );

      return new Response(
        JSON.stringify({
          reply: crisisResponse.reply,
          mood: "crisis",
          crisis: true,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const conversationHistory = await getConversationHistory(
      supabaseUrl,
      supabaseKey,
      sessionToken
    );

    let aiResponse;
    try {
      aiResponse = await generateAIResponse(sanitizedMessage, conversationHistory);
    } catch (aiError) {
      console.error("AI Error:", aiError);
      const fallback = getFallbackResponse();
      return new Response(
        JSON.stringify(fallback),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    await saveConversation(
      supabaseUrl,
      supabaseKey,
      sessionToken,
      sanitizedMessage,
      aiResponse,
      false
    );

    return new Response(
      JSON.stringify({
        reply: aiResponse.response,
        mood: aiResponse.mood,
        crisis: false,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    const fallback = getFallbackResponse();
    return new Response(
      JSON.stringify(fallback),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
