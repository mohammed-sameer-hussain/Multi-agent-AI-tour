# 🎧 EchoGuide — Multi-Agent AI Audio Tour Guide Platform

> **A production-ready, full-stack conversational voice agent platform that generates immersive, self-guided audio tours tailored to any location, interest categories, and duration.**

Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, **Node.js/Express**, and powered by **Google Gemini 2.5 Flash** with specialized multi-agent orchestration, synchronized audio speech narration, and full-stack authentication.

---

## 🚀 Quick Start in VS Code (Ready to Run)

Follow these steps to run this project locally on your machine in VS Code:

### 1. Prerequisites
- **Node.js**: Version `20.x` or `22.x+` (check with `node -v`)
- **npm** or **bun**: Package manager

### 2. Setup & Installation
In your VS Code terminal:

```bash
# 1. Install all dependencies
npm install

# 2. Configure Environment Variables
cp .env.example .env
```

Open `.env` and set your Gemini API key (optional — rich procedural fallbacks and curated tours work out of the box if no key is provided):

```env
GEMINI_API_KEY="your-gemini-api-key-here"
PORT=3000
JWT_SECRET="your-secure-jwt-secret-key"
```

### 3. Launch Development Server
```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser!

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🏛️ Multi-Agent Architecture

EchoGuide adapts the multi-agent design into a high-performance, asynchronous pipeline:

```
[ User Input: Location, Interests, Duration, Voice Style ]
                           │
                           ▼
                 [ 1. Planner Agent ]
   - Analyzes location & user interest weights
   - Computes time allocations (Intro, Content, Conclusion)
   - Enforces strict 150 words/minute audio pacing budget
                           │
                           ▼
             [ 2. Specialist Agents (Parallel) ]
   ├── ArchitectureAgent : Façades, engineering feats, styles
   ├── HistoricalAgent   : Chronologies, revolutions, hidden lore
   ├── CulturalAgent     : Living customs, music, neighborhood life
   └── CulinaryAgent     : Signature dishes, markets, flavors
                           │
                           ▼
               [ 3. Orchestrator Agent ]
   - Creates welcoming orientation & atmospheric intro
   - Weaves smooth walking transitions between domains
   - Generates landmark waypoints and route timeline
   - Synthesizes reflective conclusion
                           │
                           ▼
             [ 4. Speech & Player Engine ]
   - Real-time Web Speech API voice narration
   - Synchronized paragraph-level reader highlight
   - Standalone Audio (.wav) file generation & export
```

---

## 🔒 Security & Authentication Architecture

1. **Server-Side API Key Proxy**:
   - `GEMINI_API_KEY` is kept strictly on the backend (`server.ts`).
   - Browser clients make calls to `/api/tours/generate`, preventing API key theft or exposure in client bundles.

2. **Authentication & Session Management**:
   - **Password Hashing**: `bcryptjs` with 10 salt rounds for secure password storage.
   - **JSON Web Tokens (JWT)**: HMAC-SHA256 tokens with configurable expiration (7 days).
   - **HttpOnly Cookies & Bearer Tokens**: Supports both Authorization headers and secure cookies.
   - **1-Click Demo Accounts**: Preloaded demo users (`explorer@echoguide.ai` and `traveler@echoguide.ai`) for instant testing without manual registration.

3. **Input Sanitization & Protection**:
   - Word count enforcement and regex cleansing against prompt injection and markdown leakage into audio streams.

---

## 📁 Project Structure

```
├── server.ts                    # Express backend + Vite dev middleware & API routes
├── src/
│   ├── App.tsx                  # Main application orchestrator & tab controller
│   ├── main.tsx                 # React 19 entry point
│   ├── index.css                # Tailwind CSS v4 styling & typography
│   ├── components/
│   │   ├── Navbar.tsx           # Brand header, navigation & auth profile
│   │   ├── TourStudio.tsx       # Tour generator form & live agent stepper
│   │   ├── TourPlayer.tsx       # Interactive audio bar, waypoints & reader
│   │   ├── TourLibrary.tsx      # Browse, filter & save curated tours
│   │   ├── AuthModal.tsx        # Sign in, register & 1-click demo modal
│   │   └── ArchitectureModal.tsx# In-app architecture specs & setup guide
│   └── lib/
│       ├── types.ts             # TypeScript domain models
│       ├── agents/
│       │   ├── planner.ts       # Time allocation & word budget calculations
│       │   ├── prompts.ts       # Specialist agent prompts & personas
│       │   └── parser.ts        # Script assembling & paragraph tokenizer
│       ├── audio/
│       │   └── audioEngine.ts   # Web Speech API & audio WAV blob exporter
│       ├── auth/
│       │   ├── authStore.ts     # Bcrypt & JWT user management
│       │   └── AuthContext.tsx  # React Context for auth state
│       └── tours/
│           ├── sampleTours.ts   # Curated tours (Barcelona, Kyoto, Florence)
│           └── tourGenerator.ts # Multi-agent Gemini orchestrator
├── package.json                 # Modern dependencies & scripts
├── tsconfig.json                # Strict TypeScript configuration
└── vite.config.ts               # Vite configuration with Tailwind v4
```

---

## 🧪 Running Unit Tests

We use Node's native test runner (`node:test` and `node:assert/strict`) via `tsx`:

```bash
# Run all tests
npm test

# Run individual test suites
npx --yes tsx --test src/lib/agents/planner.test.ts
npx --yes tsx --test src/lib/agents/parser.test.ts
npx --yes tsx --test src/lib/auth/authStore.test.ts
```

---

## 🎛️ Voice Styles & Personas

- **Friendly & Casual**: Warm companion, walking side-by-side with conversational cues ("Take a look to your left").
- **Professional & Detailed**: Scholarly docent and architectural historian, highlighting construction techniques and dates.
- **Enthusiastic & Energetic**: Vibrant local insider, packed with sensory descriptions, flavors, and dramatic stories.

---

## 📄 License
Apache-2.0
