# EchoGuide — AI-Powered Personalized Audio Tour Platform

## 1. Project Overview

**EchoGuide** is a production-oriented, personalized self-guided audio tour platform powered by a collaborative multi-agent Generative AI architecture. It transforms conventional travel exploration into an interactive, location-aware storytelling experience by generating structured, engaging, and duration-controlled audio tours tailored to individual interests.

Unlike traditional AI-powered tour generators that rely on a single monolithic prompt, EchoGuide implements a **specialized multi-agent workflow** that distributes tour generation across domain-specific agents. Each agent is responsible for a distinct area of expertise, including history, architecture, culture, and culinary heritage.

A deterministic Mathematical Planner Agent manages narrative allocation and calculates precise word budgets based on the requested tour duration. A Lead Orchestrator Agent coordinates the generated content, creates contextual transitions, establishes geographical waypoints, and assembles the final tour into a cohesive narrative.

The platform integrates AI-generated narration, intelligent text-to-speech, synchronized transcript highlighting, interactive route visualization, and secure user authentication to deliver an immersive digital tour experience.

## 2. Multi-Agent System Architecture

The core of EchoGuide is its collaborative agent orchestration pipeline, implemented through `src/lib/agents/` and `src/lib/tours/tourGenerator.ts`.

The system operates through three sequential stages:

### Stage 1: Mathematical Planning and Content Allocation

The Mathematical Planner Agent establishes the structural blueprint for each tour.

- Accepts destination, requested duration, and selected thematic categories.
- Supports tour durations ranging from 5 to 45 minutes.
- Uses an estimated conversational narration speed of 150 words per minute.
- Allocates 10% of the total narrative budget to the introduction.
- Distributes 80% across selected thematic chapters.
- Reserves the remaining 10% for the conclusion.
- Calculates individual chapter word targets to maintain consistent narration duration.

### Stage 2: Parallel Domain-Specific Content Generation

Specialized AI agents independently generate narratives within their assigned domains.

| Specialized Agent | Primary Responsibilities |
|---|---|
| History Agent | Historical milestones, influential personalities, significant events, and cultural transformations. |
| Architecture Agent | Architectural styles, structural engineering, building materials, facades, and historical construction techniques. |
| Culinary Agent | Regional cuisine, traditional dishes, food markets, culinary heritage, and local ingredients. |
| Culture Agent | Local traditions, dialects, artisan communities, neighborhood lifestyles, and cultural practices. |

Each agent receives a predefined thematic instruction set and an allocated content budget, reducing unnecessary overlap and improving narrative consistency.

### Stage 3: Lead Orchestration and Tour Assembly

The Lead Orchestrator Agent integrates the individual narratives into a unified tour experience.

Its responsibilities include:

- Generating welcoming introductions and destination overviews.
- Establishing contextual connections between thematic chapters.
- Creating seamless transitions between different storytelling perspectives.
- Generating geographical waypoints and landmark descriptions.
- Providing location-specific observation suggestions.
- Producing reflective conclusions that bring the tour together.
- Structuring the final output into machine-readable JSON.

### Architecture Workflow

```text
                 USER TOUR REQUEST
              (Destination, Duration,
                 Selected Themes)
                         |
                         v
              MATHEMATICAL PLANNER
             (Duration & Word Budget)
                         |
                         v
               CONTENT ALLOCATION
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
     HISTORY AGENT  ARCHITECTURE   CULTURE AGENT
                       AGENT
          |              |              |
          +--------------+--------------+
                         |
                    CULINARY AGENT
                         |
                         v
                GENERATED CHAPTERS
                         |
                         v
               LEAD ORCHESTRATOR
             (Narrative Integration)
                         |
             +-----------+-----------+
             |           |           |
             v           v           v
          INTRO      TRANSITIONS   CONCLUSION
             |           |           |
             +-----------+-----------+
                         |
                         v
                COMPLETE AUDIO TOUR
                         |
              +----------+----------+
              |                     |
              v                     v
         AUDIO PLAYER         ROUTE WAYPOINTS
              |                     |
              v                     v
       SYNCHRONIZED TTS       INTERACTIVE MAP
```

## 3. Core Features and Functional Capabilities

### 3.1 Intelligent Audio Generation and Playback

Implemented through `src/lib/audio/audioEngine.ts` and `TourPlayer.tsx`.

EchoGuide provides a dual-engine speech synthesis architecture designed to maintain audio accessibility and playback continuity.

**Cloud-Based Neural Speech**
- Integrates Gemini-powered speech generation through the `/api/tts/speak` endpoint.
- Produces natural-sounding narration using cloud-based speech synthesis.
- Supports configurable voice personas.

**Browser-Based Speech Synthesis**
- Uses the native Web Speech API as a local fallback.
- Detects and selects available high-quality system voices.
- Supports compatible enhanced and natural voices across supported browsers and operating systems.

**Advanced Playback Capabilities**
- Real-time sentence and paragraph highlighting synchronized with narration.
- Adjustable playback speeds: 0.75x, 1x, 1.25x, and 1.5x.
- Forward and backward navigation with 15-second skipping.
- Voice persona selection, including Docent, Historian, and Casual Local Companion.
- Text normalization for improved pronunciation of abbreviations, Roman numerals, and historical century references.

### 3.2 Interactive Route and Landmark Visualization

Implemented through `TourRouteMap.tsx`.

The platform complements audio storytelling with a geographical exploration interface.

- Displays tour waypoints and connected route segments.
- Provides landmark preview cards and contextual descriptions.
- Organizes stops by thematic categories.
- Includes observation suggestions to help visitors identify important visual details.
- Tracks tour progress across individual waypoints.

### 3.3 AI-Powered Tour Studio

Implemented through `TourStudio.tsx`.

The Tour Studio provides an interactive environment for generating customized audio tours.

- Destination search and custom tour creation.
- Preconfigured destination presets, including Jaipur City Palace, Kyoto Gion, Rome Colosseum, Barcelona Gothic Quarter, Paris Montmartre, and Udaipur.
- Configurable tour duration from 5 to 45 minutes.
- Dynamic word-budget and chapter estimation.
- Theme-based agent selection.
- Live agent execution status and processing logs.
- Visibility into individual agent execution stages.

### 3.4 Personalized Tour Library

Implemented through `TourLibrary.tsx`.

- Provides a collection of preconfigured sample tours.
- Displays tour descriptions, duration, and thematic categories.
- Supports bookmarking and saving tours to a personal library.
- Organizes previously generated tour content for convenient access.

### 3.5 Secure Authentication and Session Management

Implemented through `server.ts` and `src/lib/auth/authStore.ts`.

- JWT-based authentication and session management.
- HTTP-only cookie-based session handling.
- Bearer token authentication fallback.
- Password hashing using `bcryptjs`.
- Preconfigured demonstration accounts.
- Authenticated access to personalized user functionality.

### 3.6 Intelligent Fallback and Reliability

EchoGuide incorporates a deterministic procedural content-generation fallback to improve application resilience.

When Gemini credentials are unavailable or API requests encounter rate limits or service failures, the platform can switch to built-in procedural content generators.

The audio player also supports browser-native speech synthesis as an alternative to cloud-based speech generation.

This architecture helps preserve core application functionality even when external AI services are unavailable.

## 4. Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React 19, TypeScript |
| UI and Styling | Tailwind CSS v4, Lucide Icons |
| Animations | Motion / Framer Motion |
| Backend | Node.js, Express.js |
| Development Server | Vite 8, Dynamic Vite Middleware |
| AI Integration | Google Gemini, `@google/genai` |
| AI Orchestration | Custom Multi-Agent Architecture |
| Speech Synthesis | Gemini TTS, Web Speech API |
| Audio Processing | AudioContext, WAV Encoding |
| Authentication | JWT, bcryptjs, cookie-parser |
| Runtime | TypeScript, tsx, ES2022 |
| Testing | Vitest-compatible test suites for planner and parser logic |

## 5. Engineering Highlights and Technical Innovation

EchoGuide demonstrates several important software engineering and AI development concepts:

**1. Collaborative Multi-Agent Intelligence**

Decomposes a complex content-generation task into specialized responsibilities instead of depending on a single general-purpose LLM prompt.

**2. Deterministic Narrative Planning**

Combines mathematical word-budget allocation with probabilistic AI content generation to maintain predictable tour structures and estimated narration durations.

**3. Context-Aware Narrative Orchestration**

Connects independently generated thematic chapters into a continuous storytelling experience through contextual transitions and geographical references.

**4. Resilient AI Integration**

Implements procedural content-generation and browser-native speech fallbacks to reduce dependency on external AI services.

**5. Synchronized Audio and Text Experience**

Combines speech synthesis, transcript highlighting, playback controls, and text normalization to improve accessibility and user engagement.

**6. Full-Stack Application Engineering**

Integrates a React and TypeScript frontend with an Express backend, AI services, authentication, and interactive user-facing components.

## 6. Project Summary

EchoGuide demonstrates the practical application of multi-agent Generative AI, deterministic planning, speech synthesis, and full-stack web development within the travel technology domain.

By combining specialized AI agents with a mathematical planning mechanism and a lead orchestration layer, the platform transforms destination information into structured, personalized, and duration-controlled audio experiences.

Its architecture emphasizes modularity, reliability, user personalization, and interactive storytelling, making it a strong demonstration of applied agentic AI engineering and modern full-stack application development.
