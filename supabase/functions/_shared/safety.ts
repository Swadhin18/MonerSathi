import crisisKeywordsData from "./crisis_keywords.json" with { type: "json" };

export interface CrisisDetectionResult {
  isCrisis: boolean;
  category: string | null;
  severity: "low" | "medium" | "high" | "critical";
  matchedKeywords: string[];
}

export function detectCrisis(message: string): CrisisDetectionResult {
  const normalizedMessage = message.toLowerCase().trim();

  const result: CrisisDetectionResult = {
    isCrisis: false,
    category: null,
    severity: "low",
    matchedKeywords: [],
  };

  if (!normalizedMessage) return result;

  const selfHarmKeywords = crisisKeywordsData.self_harm.keywords;
  const hopelessnessKeywords = crisisKeywordsData.hopelessness.keywords;
  const anxietyKeywords = crisisKeywordsData.severe_anxiety.keywords;
  const selfHarmPatterns = crisisKeywordsData.self_harm.patterns;
  const hopelessnessPatterns = crisisKeywordsData.hopelessness.patterns;
  const anxietyPatterns = crisisKeywordsData.severe_anxiety.patterns;

  for (const keyword of selfHarmKeywords) {
    if (normalizedMessage.includes(keyword.toLowerCase())) {
      result.isCrisis = true;
      result.category = "self_harm";
      result.severity = "critical";
      result.matchedKeywords.push(keyword);
    }
  }

  for (const pattern of selfHarmPatterns) {
    try {
      const regex = new RegExp(pattern, "gi");
      if (regex.test(normalizedMessage)) {
        result.isCrisis = true;
        result.category = "self_harm";
        result.severity = "critical";
        result.matchedKeywords.push(`pattern:${pattern}`);
      }
    } catch (e) {
      console.error(`Invalid regex pattern: ${pattern}`);
    }
  }

  if (result.severity !== "critical") {
    for (const keyword of hopelessnessKeywords) {
      if (normalizedMessage.includes(keyword.toLowerCase())) {
        result.isCrisis = true;
        result.category = "hopelessness";
        result.severity = result.severity === "low" ? "high" : result.severity;
        result.matchedKeywords.push(keyword);
      }
    }

    for (const pattern of hopelessnessPatterns) {
      try {
        const regex = new RegExp(pattern, "gi");
        if (regex.test(normalizedMessage)) {
          result.isCrisis = true;
          result.category = "hopelessness";
          result.severity = "high";
          result.matchedKeywords.push(`pattern:${pattern}`);
        }
      } catch (e) {
        console.error(`Invalid regex pattern: ${pattern}`);
      }
    }
  }

  if (result.severity === "low") {
    for (const keyword of anxietyKeywords) {
      if (normalizedMessage.includes(keyword.toLowerCase())) {
        result.isCrisis = true;
        result.category = "severe_anxiety";
        result.severity = "medium";
        result.matchedKeywords.push(keyword);
      }
    }

    for (const pattern of anxietyPatterns) {
      try {
        const regex = new RegExp(pattern, "gi");
        if (regex.test(normalizedMessage)) {
          result.isCrisis = true;
          result.category = "severe_anxiety";
          result.severity = "medium";
          result.matchedKeywords.push(`pattern:${pattern}`);
        }
      } catch (e) {
        console.error(`Invalid regex pattern: ${pattern}`);
      }
    }
  }

  return result;
}

export function getCrisisResponse(): {
  reply: string;
  mood: string;
  crisis: boolean;
} {
  const emergencyData = crisisKeywordsData.emergency_response_bn;

  const helplineText = emergencyData.helplines
    .map((h) => `${h.name}: ${h.number}`)
    .join("\n");

  const suggestionsText = emergencyData.suggestions
    .map((s) => `• ${s}`)
    .join("\n");

  const reply = `${emergencyData.title}

${emergencyData.message}

${helplineText}

অন্যান্য পদক্ষেপ:
${suggestionsText}

এই মুহূর্তে আপনার সাথে আছি। আপনি একা নন।`;

  return {
    reply,
    mood: "crisis",
    crisis: true,
  };
}

export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";

  let sanitized = input.trim();

  sanitized = sanitized.replace(/[<>]/g, "");
  sanitized = sanitized.replace(/javascript:/gi, "");
  sanitized = sanitized.replace(/on\w+=/gi, "");

  const maxLength = 2000;
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

export function isValidBanglaMessage(message: string): boolean {
  if (!message || message.trim().length === 0) return false;
  if (message.length > 2000) return false;

  const banglaPattern = /[\u0980-\u09FF]/;
  const hasBangla = banglaPattern.test(message);
  const hasValidContent = message.trim().length > 0;

  return hasBangla || hasValidContent;
}
