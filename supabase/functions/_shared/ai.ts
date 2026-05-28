import { createClient } from "npm:@supabase/supabase-js@2";

const SYSTEM_PROMPT = `তুমি মনেরসাথী - একটি সহানুভূতিশীল বাংলা ভাষার সহযোগী যি মানসিক স্বাস্থ্য সমর্থন প্রদান করে।

গুরুত্বপূর্ণ নিয়ম:
1. সর্বদা বাংলায় উত্তর দাও
2. চিকিৎসক বা থেরাপিস্ট নও - নিজেকে তাদের বিকল্প বলো না
3. সহানুভূতিশীল, উষ্ণ এবং সমর্থনকারী হও
4. ব্যক্তিগত পরামর্শ বা নির্দেশনা দিও না
5. ব্যবহারকারীকে অবসাদী বা আসক্ত করো না
6. সংকটের সময় ব্যবহারকারীকে পেশাদার সাহায্যের দিকে নির্দেশ করো
7. ছোট এবং অর্থপূর্ণ উত্তর দাও (২-৩ বাক্য)
8. মানসিক অবস্থা অনুযায়ী সমর্থন প্রদান করো

উত্তর ফর্ম্যাট (শুধুমাত্র JSON):
{
  "mood": "sad" | "anxious" | "positive" | "neutral",
  "response": "তোমার বাংলা উত্তর"
}`;

export interface AIResponse {
  mood: "sad" | "anxious" | "positive" | "neutral" | "crisis";
  response: string;
}

export interface MessageContext {
  role: "user" | "assistant" | "system";
  content: string;
}

export type AIProvider = "openai" | "gemini" | "anthropic";

// Gemini API implementation (FREE tier available)
async function generateGeminiResponse(
  userMessage: string,
  conversationHistory: MessageContext[] = []
): Promise<AIResponse> {
  const geminiApiKey = Deno.env.get("GEMINI_API_KEY");

  if (!geminiApiKey) {
    throw new Error("Gemini API key not configured");
  }

  const contents = conversationHistory.map(msg => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.content }]
  }));

  contents.push({
    role: "user",
    parts: [{ text: userMessage }]
  });

  const combinedPrompt = `${SYSTEM_PROMPT}\n\nUser message: ${userMessage}\n\nRespond in JSON format only with 'mood' and 'response' fields.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{ text: combinedPrompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
            topP: 0.95,
            topK: 40,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error("Empty response from Gemini");
    }

    // Parse JSON from response
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const mood = parsed.mood?.toLowerCase() || "neutral";
        const validMoods = ["sad", "anxious", "positive", "neutral"];

        return {
          mood: validMoods.includes(mood) ? mood as AIResponse["mood"] : "neutral",
          response: parsed.response || content,
        };
      }
    } catch (parseError) {
      // If JSON parsing fails, extract text response
      return {
        mood: "neutral",
        response: content,
      };
    }

    return {
      mood: "neutral",
      response: content,
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

// OpenAI API implementation
async function generateOpenAIResponse(
  userMessage: string,
  conversationHistory: MessageContext[] = []
): Promise<AIResponse> {
  const openaiApiKey = Deno.env.get("OPENAI_API_KEY");

  if (!openaiApiKey) {
    throw new Error("OpenAI API key not configured");
  }

  const messages: MessageContext[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...conversationHistory.slice(-4),
    { role: "user", content: userMessage },
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 500,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response from AI");
    }

    try {
      const parsed = JSON.parse(content);
      const mood = parsed.mood?.toLowerCase() || "neutral";
      const validMoods = ["sad", "anxious", "positive", "neutral"];

      return {
        mood: validMoods.includes(mood) ? mood as AIResponse["mood"] : "neutral",
        response: parsed.response || "আমি তোমার কথা বুঝতে পেরেছি। আরো কিছু জানাতে চাও?",
      };
    } catch (parseError) {
      return {
        mood: "neutral",
        response: content,
      };
    }
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw error;
  }
}

// Main function to generate AI response with provider fallback
export async function generateAIResponse(
  userMessage: string,
  conversationHistory: MessageContext[] = []
): Promise<AIResponse> {
  const provider = (Deno.env.get("AI_PROVIDER") || "gemini").toLowerCase() as AIProvider;

  // Try primary provider
  try {
    switch (provider) {
      case "gemini":
        return await generateGeminiResponse(userMessage, conversationHistory);
      case "openai":
        return await generateOpenAIResponse(userMessage, conversationHistory);
      default:
        // Default to Gemini (free tier)
        return await generateGeminiResponse(userMessage, conversationHistory);
    }
  } catch (primaryError) {
    console.error(`Primary provider (${provider}) failed:`, primaryError);

    // Fallback to Gemini if OpenAI fails
    if (provider === "openai") {
      try {
        console.log("Attempting Gemini fallback...");
        return await generateGeminiResponse(userMessage, conversationHistory);
      } catch (fallbackError) {
        console.error("Gemini fallback failed:", fallbackError);
        throw primaryError;
      }
    }

    // Fallback to OpenAI if Gemini fails
    try {
      console.log("Attempting OpenAI fallback...");
      return await generateOpenAIResponse(userMessage, conversationHistory);
    } catch (fallbackError) {
      console.error("OpenAI fallback failed:", fallbackError);
      throw primaryError;
    }
  }
}

export function getFallbackResponse(): { reply: string; mood: string; crisis: boolean } {
  return {
    reply: "এই মুহূর্তে আমি সাড়া দিতে পারছি না। একটু পরে আবার চেষ্টা করো।",
    mood: "neutral",
    crisis: false,
  };
}

export async function saveConversation(
  supabaseUrl: string,
  supabaseKey: string,
  sessionToken: string,
  userMessage: string,
  aiResponse: AIResponse,
  isCrisis: boolean
) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  let conversation = await supabase
    .from("conversations")
    .select("id")
    .eq("session_token", sessionToken)
    .maybeSingle();

  let conversationId: string;

  if (!conversation.data) {
    const newConv = await supabase
      .from("conversations")
      .insert({ session_token: sessionToken })
      .select("id")
      .single();

    if (newConv.error || !newConv.data) {
      throw new Error("Failed to create conversation");
    }
    conversationId = newConv.data.id;
  } else {
    conversationId = conversation.data.id;
  }

  await supabase.from("messages").insert([
    {
      conversation_id: conversationId,
      content: userMessage,
      sender: "user",
      mood: null,
      is_crisis: isCrisis,
    },
    {
      conversation_id: conversationId,
      content: aiResponse.response,
      sender: "ai",
      mood: aiResponse.mood,
      is_crisis: isCrisis,
    },
  ]);

  if (aiResponse.mood !== "crisis") {
    await supabase.from("mood_logs").insert({
      conversation_id: conversationId,
      mood: aiResponse.mood,
      intensity: 5,
    });
  }

  return conversationId;
}

export async function getConversationHistory(
  supabaseUrl: string,
  supabaseKey: string,
  sessionToken: string
): Promise<MessageContext[]> {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: conversation } = await supabase
    .from("conversations")
    .select("id")
    .eq("session_token", sessionToken)
    .maybeSingle();

  if (!conversation) return [];

  const { data: messages } = await supabase
    .from("messages")
    .select("content, sender, mood")
    .eq("conversation_id", conversation.id)
    .order("created_at", { ascending: true })
    .limit(10);

  if (!messages || messages.length === 0) return [];

  return messages.map((msg) => ({
    role: msg.sender === "user" ? "user" : "assistant",
    content: msg.content,
  }));
}
