# মনেরসাথী (MonerSathi)

A Bangla-first emotional support assistant for Bengali-speaking users experiencing stress, sadness, anxiety, loneliness, or emotional distress.

**Important:** MonerSathi is NOT a therapist and does NOT claim to replace professional mental health services.

## 🌟 Features

- **Bangla-First Design**: Complete conversational interface in Bengali
- **Emotional Support**: Empathetic AI responses for emotional distress
- **Crisis Detection**: Automatic detection of crisis situations with emergency helpline redirection
- **Mood-Based UI**: Dynamic UI theming based on detected emotional state
- **Privacy-First**: No personal data storage, anonymous sessions
- **Modern UI/UX**: Calming gradients, smooth animations, mobile-first responsive design

## 🚀 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- TailwindCSS
- Framer Motion (animations)
- React Router
- Axios

### Backend
- Supabase Edge Functions (Deno runtime)
- PostgreSQL (via Supabase)
- Row Level Security (RLS)

### AI Layer
- **Gemini 1.5 Flash** (FREE tier - 60 requests/min)
- OpenAI GPT-4o-mini (fallback option)
- Configurable model provider with automatic fallback
- Backend-only API key handling

## 📦 Installation

### Prerequisites
- Node.js 18+ or Node.js 20+
- npm or yarn
- Supabase account (free tier works)
- **Gemini API key** (FREE - recommended) OR OpenAI API key

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/monersathi.git
cd monersathi
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The Supabase Edge Functions automatically have access to:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY` (configure via Supabase dashboard) - **FREE**
- `OPENAI_API_KEY` (optional fallback)
- `AI_PROVIDER` (set to "gemini" or "openai", default: gemini)

4. **Set up AI Provider (Choose One)**

**Option A: Gemini (RECOMMENDED - FREE)**
1. Get free API key at https://makersuite.google.com/app/apikey
2. In Supabase Dashboard → Edge Functions → Secrets
3. Add: `GEMINI_API_KEY` = your-key-here
4. Add: `AI_PROVIDER` = gemini

**Option B: OpenAI (Paid)**
1. Get API key at https://platform.openai.com/api-keys
2. In Supabase Dashboard → Edge Functions → Secrets
3. Add: `OPENAI_API_KEY` = your-key-here
4. Add: `AI_PROVIDER` = openai

**Note:** The system has automatic fallback - if your primary provider fails, it tries the other one.

5. **Run the development server**
```bash
npm run dev
```

## 🧪 Testing

```bash
# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run
```

## 🚢 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy the 'dist' folder to Vercel
```

### Backend (Supabase)
Edge functions are auto-deployed via Supabase. No manual deployment needed.

## 📁 Project Structure

```
monersathi/
├── src/
│   ├── components/         # React components
│   │   ├── Navbar.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── TypingIndicator.tsx
│   │   └── DisclaimerModal.tsx
│   ├── pages/             # Page components
│   │   ├── Landing.tsx
│   │   ├── Chat.tsx
│   │   └── About.tsx
│   ├── contexts/          # React contexts
│   │   └── SessionContext.tsx
│   ├── services/          # API services
│   │   └── api.ts
│   ├── utils/             # Utility functions
│   │   └── moodColors.ts
│   ├── lib/               # Library configurations
│   │   └── supabase.ts
│   └── App.tsx            # Main application
├── supabase/
│   └── functions/
│       ├── _shared/       # Shared utilities
│       │   ├── safety.ts
│       │   ├── ai.ts
│       │   └── crisis_keywords.json
│       └── chat/
│           └── index.ts   # Main chat API
├── __tests__/            # Test files
└── public/               # Static assets
```

## 🔒 Security Features

- **Crisis Detection**: Local keyword-based detection before AI processing
- **Input Sanitization**: XSS and injection attack prevention
- **Rate Limiting**: Built-in API protection
- **Row Level Security**: Database-level access control
- **Anonymous Sessions**: No user tracking or personal data collection
- **CORS Protection**: Secure cross-origin resource sharing

## ⚠️ Crisis Handling

The system detects crisis situations through:
- Keyword matching (self-harm, hopelessness, severe anxiety)
- Regex pattern matching for nuanced detection
- Severity classification (low, medium, high, critical)

When crisis is detected:
1. AI is NOT called
2. Emergency response is returned immediately
3. Helpline numbers are displayed
4. UI switches to crisis mode

## 🎨 Mood-Based Theming

The UI dynamically adapts based on detected mood:
- **Sad**: Cool blue gradients
- **Anxious**: Soft orange tones
- **Positive**: Emerald green accents
- **Neutral**: Slate gray palette
- **Crisis**: Alert red with emergency info

## 📝 API Reference

### POST /api/chat

Send a message to the emotional support assistant.

**Request Body:**
```json
{
  "message": "আমি খুব একা লাগছে",
  "sessionToken": "uuid-session-token"
}
```

**Response:**
```json
{
  "reply": "আমি তোমার কথা শুনছি...",
  "mood": "sad",
  "crisis": false
}
```

## 🧰 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run test         # Run test suite
```

## 🤝 Contributing

This is an open-source project aimed at supporting Bengali speakers' mental health. Contributions are welcome!

Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- OpenAI for GPT-4o-mini access
- Supabase for backend infrastructure
- The Bengali-speaking community for inspiration

## 📞 Emergency Contacts

- Bangladesh National Mental Health Helpline: 02-9137978
- Dhaka Medical College Hospital: 02-8626718
- Chittagong Medical College Hospital: 031-650450

---

**Disclaimer:** MonerSathi is an emotional support tool and NOT a replacement for professional mental health services. If you're in crisis or experiencing severe distress, please contact a mental health professional or emergency services immediately.
