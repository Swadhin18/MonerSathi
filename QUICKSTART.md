# Quick Start Guide - MonerSathi

## Prerequisites

1. Node.js 18+ or Node.js 20+
2. A Supabase account (free tier works)
3. **Gemini API key (FREE - recommended)** OR OpenAI API key

## Setup Steps (5 minutes)

### 1. Supabase Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the project to be ready (takes ~2 minutes)
3. Go to Project Settings → API
4. Copy your `Project URL` and `anon public` key

### 2. Configure AI Provider

**Option A: Gemini (FREE - 60 requests/min)**

1. Get your FREE Gemini API key at https://makersuite.google.com/app/apikey
2. In Supabase Dashboard, go to **Edge Functions** → **Manage Secrets**
3. Add two secrets:
   - Name: `GEMINI_API_KEY` | Value: your-gemini-key
   - Name: `AI_PROVIDER` | Value: gemini

**Option B: OpenAI (Paid)**

1. Get OpenAI API key at https://platform.openai.com/api-keys
2. In Supabase Dashboard → Edge Functions → Manage Secrets
3. Add two secrets:
   - Name: `OPENAI_API_KEY` | Value: your-openai-key
   - Name: `AI_PROVIDER` | Value: openai

**Note:** The database schema is already configured via our migration!

### 3. Install & Run

```bash
# Install dependencies
npm install

# Create .env file
echo "VITE_SUPABASE_URL=your_supabase_url" > .env
echo "VITE_SUPABASE_ANON_KEY=your_anon_key" >> .env

# Run development server
npm run dev
```

That's it! Open http://localhost:5173 in your browser.

## Testing the Chat

Try these sample Bangla messages:

### Normal Conversation
```
আ�ি কিছুটা দুঃখিত
আজ ভালো লাগছে না
আমি একা বোধ করছি
```

### Crisis Detection (for testing)
```
আমি মরতে চাই
বাঁচতে ইচ্ছা করে না
সব শেষ হয়ে গেছে
```

You'll see emergency helplines appear automatically.

## Project Structure

```
monersathi/
├── src/                    # Frontend React app
│   ├── components/         # UI components
│   ├── pages/             # Page routes
│   ├── services/          # API layer
│   └── contexts/           # React contexts
│
└── supabase/functions/     # Backend Edge Functions
    ├── _shared/           # Shared utilities
    │   ├── safety.ts       # Crisis detection
    │   ├── ai.ts           # AI integration
    │   └── crisis_keywords.json
    └── chat/index.ts       # Chat API endpoint
```

## Architecture Overview

```
User Input
    ↓
Frontend (React)
    ↓
API Call → Supabase Edge Function (chat)
                ↓
        Crisis Detection (local)
                ↓
        ┌─────────┴─────────┐
        ↓                   ↓
    Crisis Detected      Normal Flow
        ↓                   ↓
    Emergency Response   AI Response (GPT-4o-mini)
        ↓                   ↓
        └─────────┬─────────┘
                  ↓
            Save to Database
                  ↓
            Return to Frontend
                  ↓
            Mood-based UI Update
```

## Features

### Safety System
- ✅ Local crisis detection BEFORE AI processing
- ✅ Keyword-based detection (40+ Bangla crisis keywords)
- ✅ Regex pattern matching for nuanced detection
- ✅ Severity classification (low/medium/high/critical)
- ✅ Automatic helpline display in crisis mode

### Security
- ✅ Row Level Security (RLS) on all tables
- ✅ Input sanitization (XSS prevention)
- ✅ Anonymous sessions (no user tracking)
- ✅ Backend-only API keys
- ✅ CORS protection

### AI Response
- ✅ Always responds in natural Bangla
- ✅ Empathetic tone
- ✅ No medical diagnosis
- ✅ Clear boundaries (not a therapist)
- ✅ Mood detection and classification

## Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Backend (Supabase Secrets - configure in Dashboard)
```
GEMINI_API_KEY (your free Gemini key)
AI_PROVIDER=gemini
```

Optional (for fallback):
```
OPENAI_API_KEY (your OpenAI key)
```

## Production Deployment

### Frontend → Vercel
```bash
npm run build
# Deploy 'dist' folder to Vercel
```

### Backend → Supabase (already deployed!)
Edge Functions are automatically deployed when you create them.

## Need Help?

1. Check the [README.md](./README.md) for detailed documentation
2. Review [sample-conversations.md](./__tests__/sample-conversations.md) for testing examples
3. Open an issue on GitHub

## Important Disclaimer

⚠️ **MonerSathi is NOT a therapist or medical professional.**

This is an emotional support tool that provides empathetic conversation in Bangla. It does NOT:
- Diagnose mental health conditions
- Replace professional therapy
- Provide medical advice

For serious mental health concerns, please contact:
- Bangladesh National Mental Health Helpline: 02-9137978
- Your local hospital or mental health professional
