EchoGuide is a production-grade, personalized self-guided audio tour platform powered by a collaborative multi-agent generative AI pipeline.

Rather than relying on a single generic prompt to generate travel guides, EchoGuide deconstructs the tour creation problem into a division of cognitive labor: specialized domain agents (History, Architecture, Culture, Culinary) generate focused chapters, governed by a Mathematical Planner Agent that calculates exact spoken word budgets, and unified by a Lead Orchestrator Agent that writes welcoming introductions, seamless transitions, waypoints, and closing reflections.

The platform combines this multi-agent backend with an immersive audio player (supporting both Google Gemini neural speech and client-side speech synthesis with karaoke-style text highlighting), an interactive route waypoint map, and secure authentication.
2. Multi-Agent System Architecture

The core innovation of the repository lies in src/lib/agents/ and src/lib/tours/tourGenerator.ts, which orchestrate three sequential execution stages:
Code

┌──────────────────────────┐
                          │   User Tour Request      │
                          │ (Location, Time, Themes) │
                          └─────────────┬────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. PLANNER AGENT (Deterministic Budgeter & Architect)                       │
│    • Inputs: Total minutes (5–45 min), Active Categories, Words/Min (150 WPM)│
│    • Computes time slices: Intro (10%), Chapters (80% divided), Outro (10%) │
│    • Calculates exact strict word counts per section to prevent audio drift │
└───────────────────────────────────────┬─────────────────────────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    ▼                   ▼                   ▼
    ┌───────────────────────┐ ┌───────────────────┐ ┌───────────────────┐
    │ History Agent         │ │Architecture Agent │ │Culinary / Culture │
    │ Archival milestones,  │ │Facades, materials,│ │Local terroir,     │
    │ human triumphs, drama │ │engineering feats  │ │traditions, rhythms│
    └───────────────┬───────┘ └─────────┬─────────┘ └─────────┬─────────┘
                    └───────────────────┼───────────────────┘
                                        │ Spoken Chapter Narratives
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. ORCHESTRATOR AGENT (Lead Tour Director)                                  │
│    • Synthesizes welcoming orientation and spatial framing                  │
│    • Bridges chapters with seamless audio transitions                       │
│    • Generates geographical waypoints & visual landmark stops               │
│    • Produces reflective concluding thoughts                                │
└───────────────────────────────────────┬─────────────────────────────────────┘
                                        │
                                        ▼
                         Assembled Multi-Chapter Tour
                      (Synced Audio + Map Waypoints)

The Agent Roster

    Mathematical Planner Agent (planner.ts):

        Calculates target durations based on standard conversational cadence (~150 words per minute).

        Allocates 10% to Introduction, 10% to Conclusion, and evenly distributes the remaining 80% among user-selected themes.

    Domain Specialist Agents (prompts.ts):

        Architecture Specialist: Analyzes structural design, engineering feats, facades, masonry, proportion, and regional materials.

        History Specialist: Focuses on archival milestones, pivotal civic revolutions, legendary figures, and dramatic human chronicles.

        Culinary Specialist: Evokes sensory descriptions of signature dishes, historic food markets, slow-cooked traditions, and terroir ingredients.

        Culture Specialist: Highlights living traditions, local dialect nuances, artisan workshops, and neighborhood daily life.

    Orchestrator Agent:

        Crafts unified narrative bridges between disparate themes (e.g., connecting how historic architectural arches accommodated ancient spice trade routes).

        Outputs structured JSON containing landmark waypoints with spatial observation cues.

    Deterministic Procedural Fallback:

        If the Gemini API key is missing or encounters rate limits, the system seamlessly transitions to built-in procedural generators without breaking the tour experience.

3. Key Features & Capabilities
🎙️ Immersive Audio Player (src/lib/audio/audioEngine.ts & TourPlayer.tsx)

    Dual-Tier Audio Synthesis:

        Gemini 3.8 Flash Lite Cloud TTS: High-fidelity cloud neural speech generation (/api/tts/speak).

        Intelligent Local Web Speech Engine: Automatically scans and selects best-in-class neural voices (Apple Enhanced, Microsoft Online Natural, Google Natural).

    Text Normalization: Pre-processes spoken narrative by expanding abbreviations, Roman numerals (e.g., "Louis XIV" → "Louis the Fourteenth"), and century dates before synthesis.

    Synchronized Paragraph Highlighting: Real-time visual tracking of spoken sentences as playback advances.

    Audio Controls: Variable playback speeds (0.75x, 1x, 1.25x, 1.5x), ±15-second skipping, and voice persona switching (Docent, Historian, Casual Local Companion).

🗺️ Visual Route Waypoint Map (TourRouteMap.tsx)

    Generates a step-by-step route map connecting waypoints.

    Landmark preview cards with category badges, descriptive observation tips, and progress tracking.

🎨 Tour Studio Creator (TourStudio.tsx)

    One-click presets for world-famous destinations (Jaipur City Palace, Kyoto Gion, Rome Colosseum, Barcelona Gothic Quarter, Paris Montmartre, Udaipur).

    Custom destination search bar.

    Interactive duration slider (5 to 45 minutes) with real-time word-budget and chapter estimation.

    Live Agent Execution Pipeline view displaying real-time agent status indicators (Running, Completed, Step logs).

📚 Curated Tour Library & User Storage (TourLibrary.tsx)

    Pre-loaded sample tours with rich metadata, duration, category pills, and audio scripts.

    Bookmarking / saving tours to the user's personal library.

🔐 Full-Stack Authentication (server.ts & src/lib/auth/authStore.ts)

    Lightweight JWT session management with HTTP-only cookies and Bearer token fallback.

    Password hashing with bcryptjs.

    Demo accounts initialized out of the box.

4. Technology Stack
Layer	Technologies
Frontend UI	React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion (Framer Motion)
Backend & Server	Node.js, Express (server.ts), dynamic Vite middleware integration in development
AI & LLM SDK	@google/genai (Gemini 2.5 Flash for agent generation, Gemini 3.8 Flash Lite TTS for audio)
Audio Processing	Web Speech API, AudioContext, WAV encoder, neural voice auto-detection
Authentication	JWT (jsonwebtoken), bcryptjs, cookie-parser
Tooling & Build	Vite 8, tsx for TypeScript execution, ES2022
5. Summary & Evaluation

Multi-agent-AI-tour stands out as a well-structured implementation of agentic decomposition applied to a consumer travel domain:

    Solves the "Monolithic Hallucination" problem: By constraining each agent to a specific word budget and domain instruction set, the resulting tours are concise, factually grounded, and paced to real-world walking times.

    Zero-Friction Fallback: The codebase includes offline procedural fallbacks and browser-native TTS, ensuring the user interface remains fully functional even without live API credentials.

    Production Polish: Includes full audio scrubbing, synchronized reading cursors, responsive mobile-friendly layouts, and comprehensive test files (planner.test.ts, parser.test.ts).
