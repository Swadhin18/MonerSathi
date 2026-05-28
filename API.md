# MonerSathi API Documentation

## Base URL

```
Production: https://your-project.supabase.co/functions/v1
Development: http://localhost:54321/functions/v1
```

## Authentication

All requests require the following headers:

```typescript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer YOUR_SUPABASE_ANON_KEY'
}
```

---

## AI Provider Configuration

### Supported Providers

| Provider | Model | Cost | Rate Limit | Recommended |
|----------|-------|------|------------|--------------|
| **Gemini** | gemini-1.5-flash | **FREE** | 60 req/min | ✅ Yes |
| OpenAI | gpt-4o-mini | Paid | Based on tier | Optional |

### Provider Selection

Set the `AI_PROVIDER` secret in Supabase Dashboard:

```
AI_PROVIDER=gemini  # Default, FREE
AI_PROVIDER=openai  # Paid alternative
```

### Automatic Fallback

The system includes automatic fallback:
1. If primary provider fails, tries the other provider
2. If both fail, returns a safe fallback message
3. Ensures high availability

### Configuration

**Gemini (FREE - Recommended):**
```
Secret: GEMINI_API_KEY = your-key-here
Secret: AI_PROVIDER = gemini
```

Get your free key: https://makersuite.google.com/app/apikey

**OpenAI (Paid):**
```
Secret: OPENAI_API_KEY = your-key-here
Secret: AI_PROVIDER = openai
```

Get your key: https://platform.openai.com/api-keys

---

## Endpoints

### POST /chat

Send a message to the emotional support assistant.

#### Request

**URL:** `/chat`

**Method:** `POST`

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_ANON_KEY"
}
```

**Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| message | string | Yes | User's message in Bangla (max 2000 characters) |
| sessionToken | string | Yes | Unique session identifier (UUID v4) |

**Example Request:**

```json
{
  "message": "আমি খুব একা লাগছে",
  "sessionToken": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### Response

**Success (200 OK):**

```json
{
  "reply": "আমি তোমার কথা শুনছি। একা বোধ করা সত্যিই কঠিন। তুমি কি বন্ধু বা পরিবারের কারো সাথে কথা বলেছ?",
  "mood": "sad",
  "crisis": false
}
```

**Crisis Detected (200 OK):**

```json
{
  "reply": "কঠিন সময়ে আপনি একা নন...",
  "mood": "crisis",
  "crisis": true
}
```

**Error (400 Bad Request):**

```json
{
  "error": "Message and sessionToken are required"
}
```

**Error (500 Internal Server Error):**

```json
{
  "reply": "এই মুহূর্তে আমি সাড়া দিতে পারছি না। একটু পরে আবার চেষ্টা করো।",
  "mood": "neutral",
  "crisis": false
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| reply | string | AI response in Bangla |
| mood | string | Detected mood: "sad", "anxious", "positive", "neutral", "crisis" |
| crisis | boolean | Whether crisis was detected |

---

## AI Response Generation

### Gemini Flow (FREE)

```
User Message
    ↓
System Prompt + User Message
    ↓
Gemini 1.5 Flash API
    ↓
JSON Response Parsing
    ↓
Mood Classification
    ↓
Return to User
```

**Gemini Configuration:**
- Temperature: 0.7
- Max Output: 500 tokens
- Top P: 0.95
- Top K: 40
- Safety: Medium threshold for all categories

### OpenAI Flow (Paid)

```
User Message
    ↓
Message History (last 5)
    ↓
GPT-4o-mini API
    ↓
JSON Response Format
    ↓
Return to User
```

**OpenAI Configuration:**
- Temperature: 0.7
- Max Tokens: 500
- Response Format: JSON object

---

## Data Models

### Message

```typescript
interface Message {
  id: string;              // UUID
  conversation_id: string; // UUID
  content: string;          // Message text
  sender: 'user' | 'ai';    // Who sent the message
  mood: Mood | null;       // Detected mood
  is_crisis: boolean;      // Crisis flag
  created_at: string;      // ISO timestamp
}
```

### Conversation

```typescript
interface Conversation {
  id: string;              // UUID
  session_token: string;    // Unique session ID
  is_active: boolean;      // Conversation status
  created_at: string;      // ISO timestamp
  updated_at: string;      // ISO timestamp
}
```

### Mood Log

```typescript
interface MoodLog {
  id: string;              // UUID
  conversation_id: string; // UUID
  mood: Mood;              // Detected mood
  intensity: number;       // 1-10 scale
  created_at: string;      // ISO timestamp
}
```

### Mood Types

```typescript
type Mood = 'sad' | 'anxious' | 'positive' | 'neutral' | 'crisis';
```

---

## Crisis Detection

### How It Works

1. Message is received and sanitized
2. Local keyword matching (40+ Bangla crisis keywords)
3. Regex pattern matching for nuanced detection
4. Severity classification:
   - **Critical**: Self-harm keywords detected
   - **High**: Severe hopelessness detected
   - **Medium**: Severe anxiety detected
   - **Low**: No crisis detected

### Crisis Categories

#### Self-Harm (Critical)
- **Keywords**: আত্মহত্যা, মরতে চাই, বাঁচতে ইচ্ছা করে না
- **Patterns**: `মর.*চাই`, `শেষ.*দিতে.*চাই`
- **Response**: Emergency helplines, professional help suggestion

#### Hopelessness (High)
- **Keywords**: সব শেষ, কোনো আশা নেই, উপায় নেই
- **Patterns**: `সব.*শেষ`, `আশা.*নেই`
- **Response**: Empathetic support + resources

#### Severe Anxiety (Medium)
- **Keywords**: ভয়ে মরে যাচ্ছি, দম বন্ধ হয়ে যাচ্ছে
- **Patterns**: `ভয়ে.*মর`, `দম.*বন্ধ`
- **Response**: Calming techniques + professional help suggestion

### Crisis Response Format

When crisis is detected, the system returns:

```json
{
  "reply": "কঠিন সময়ে আপনি একা নন\n\nআপনার যা মনে হচ্ছে, তা অত্যন্ত কষ্টকর। কিন্তু এই অবস্থা থেকে উপায় আছে। অনুগ্রহ করে সাহায্য নিন:\n\nজাতীয় মানসিক স্বাস্থ্য হটলাইন: ০২-৯১৩৭৯৭৮\nঢাকা মেডিকেল কলেজ হাসপাতাল: ০২-৮৬২৬৭১৮\n...\n\nএই মুহূর্তে আপনার সাথে আছি। আপনি একা নন।",
  "mood": "crisis",
  "crisis": true
}
```

---

## Rate Limiting

### Default Limits

- **Requests per minute**: 60 (Gemini free tier)
- **Messages per session**: 100
- **Message length**: 2000 characters

### Rate Limit Headers

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1234567890
```

### Rate Limit Exceeded (429):

```json
{
  "error": "Too many requests. Please wait before sending another message."
}
```

---

## Error Handling

### Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid/missing API key |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - AI or database error |
| 503 | Service Unavailable - Temporary outage |

### Error Response Format

```json
{
  "error": "Human-readable error message"
}
```

### Fallback Behavior

When AI fails, the system returns a fallback message:

```json
{
  "reply": "এই মুহূর্তে আমি সাড়া দিতে পারছি না। একটু পরে আবার চেষ্টা করো।",
  "mood": "neutral",
  "crisis": false
}
```

---

## Security

### Input Sanitization

All inputs are sanitized to prevent:
- XSS (Cross-Site Scripting)
- SQL Injection
- Command Injection

**Sanitization Rules:**
- Remove HTML tags: `<`, `>`
- Remove JavaScript: `javascript:` protocol
- Remove event handlers: `on\w+=` patterns
- Limit message length: 2000 characters
- Trim whitespace

### Row Level Security

All database tables use RLS policies:
- `conversations`: Anonymous create/read/update
- `messages`: Anonymous create/read (no personal data)
- `mood_logs`: Anonymous create/read

### CORS Configuration

Allowed Origins: `*` (configured for production use)

Allowed Methods: `POST, OPTIONS`

Allowed Headers: `Content-Type, Authorization, X-Client-Info, Apikey`

---

## Integration Examples

### JavaScript/TypeScript

```typescript
import axios from 'axios';

const sendChatMessage = async (message: string, sessionToken: string) => {
  try {
    const response = await axios.post(
      `${SUPABASE_URL}/functions/v1/chat`,
      { message, sessionToken },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Chat error:', error);
    throw error;
  }
};

// Usage
const result = await sendChatMessage(
  'আমি খুব একা লাগছে',
  '550e8400-e29b-41d4-a716-446655440000'
);

console.log(result.reply);
console.log(result.mood);
console.log(result.crisis);
```

### React Hook

```typescript
import { useState } from 'react';
import { sendMessage } from './services/api';

function useChat(sessionToken: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    setLoading(true);
    try {
      const response = await sendMessage(text, sessionToken);
      setMessages(prev => [
        ...prev,
        { text, sender: 'user' },
        { text: response.reply, sender: 'ai', mood: response.mood }
      ]);
      return response;
    } finally {
      setLoading(false);
    }
  };

  return { messages, send, loading };
}
```

---

## Cost Comparison

### Gemini (FREE Tier)
- **Cost**: $0.00
- **Requests**: 60 per minute
- **Tokens**: 32K input / 4K output per request
- **Best for**: Development, testing, small-scale production

### OpenAI (Paid)
- **Cost**: $0.15 per 1M input tokens, $0.60 per 1M output tokens
- **Rate limits**: Based on usage tier
- **Best for**: High-volume production

---

## Versioning

Current API Version: `v1`

All endpoints are prefixed with `/v1/`

Breaking changes will increment the version number.

---

## Support

- **Documentation**: This file
- **Issues**: GitHub Issues
- **Email**: api@monersathi.org

---

## Changelog

### v1.1.0 (2026-05-28)
- Added Gemini API support (FREE tier)
- Automatic provider fallback
- Multi-provider configuration
- Updated documentation

### v1.0.0 (2026-05-28)
- Initial release
- POST /chat endpoint
- Crisis detection
- Mood classification
- Basic error handling
