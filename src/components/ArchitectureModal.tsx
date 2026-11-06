import React, { useState } from 'react';
import { 
  Shield, 
  Terminal, 
  Copy, 
  Check, 
  Cpu, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  ExternalLink,
  Code2,
  FileCode,
  Key,
  Database
} from 'lucide-react';

export function ArchitectureModal() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const vscodeSteps = `# 1. Clone or copy your project folder into VS Code
cd ai-audio-tour-agent

# 2. Install all required dependencies
npm install

# 3. Configure your environment variables (.env file)
cp .env.example .env
# Open .env and add your GEMINI_API_KEY (optional, fallback engine active)

# 4. Start the Full-Stack modern development server
npm run dev

# 5. Open your browser at:
# http://localhost:3000`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-12">
      
      {/* Title & Introduction */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs font-mono mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>System Architecture & Engineering Specification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          How EchoGuide Works Under the Hood
        </h1>
        <p className="mt-3 text-slate-300 text-base max-w-3xl leading-relaxed">
          EchoGuide translates the multi-agent AI tour concept into a modern full-stack web architecture. It pairs specialized Gemini 2.5 generative agents with real-time speech synchronization and secure session management.
        </p>
      </div>

      {/* Interactive Architecture Flow Diagram */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <span>Multi-Agent Generative Pipeline</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Agent 1 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Stage 01</span>
              <h3 className="text-sm font-bold text-white mt-1">Planner Agent</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Evaluates user location and interests. Determines mathematical minute allocations and word caps based on 150 words-per-minute audio pacing.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] font-mono text-slate-500">
              Output: TimeAllocation & WordBudget
            </div>
          </div>

          {/* Agent 2 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Stage 02</span>
              <h3 className="text-sm font-bold text-white mt-1">Specialist Agents</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Four dedicated prompt personas (Architecture, History, Culture, Culinary) conduct parallel knowledge synthesis with strict word limits.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] font-mono text-slate-500">
              Output: Spoken Domain Paragraphs
            </div>
          </div>

          {/* Agent 3 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Stage 03</span>
              <h3 className="text-sm font-bold text-white mt-1">Orchestrator Agent</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Connects domains with smooth walk transitions, crafts welcoming introductions, generates waypoints, and forms a unified tour narrative.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] font-mono text-slate-500">
              Output: Structured Tour & Waypoints
            </div>
          </div>

          {/* Agent 4 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Stage 04</span>
              <h3 className="text-sm font-bold text-white mt-1">Audio & Speech Engine</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Web Speech API engine streams speech with synchronized paragraph highlights while an acoustic WAV generator exports standalone audio files.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] font-mono text-slate-500">
              Output: Synchronized Playback & WAV
            </div>
          </div>

        </div>
      </div>

      {/* VS Code Quickstart & Setup Guide */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-white">
                VS Code: Ready-to-Run Setup Guide
              </h2>
              <p className="text-xs text-slate-400">
                How to copy this application into your local VS Code environment and run in seconds.
              </p>
            </div>
          </div>

          <button
            onClick={() => copySnippet(vscodeSteps, 'vscode-steps')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center gap-1.5"
          >
            {copiedCode === 'vscode-steps' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCode === 'vscode-steps' ? 'Copied' : 'Copy Commands'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300/90 overflow-x-auto leading-relaxed">
          {vscodeSteps}
        </pre>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-1">
            <span className="font-semibold text-slate-200 block flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Security & Secrets</span>
            </span>
            <p className="text-slate-400">
              All LLM API calls are securely proxied through Express backend routes. Your <code className="text-amber-300">GEMINI_API_KEY</code> is never exposed to client browsers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-1">
            <span className="font-semibold text-slate-200 block flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>Authentication</span>
            </span>
            <p className="text-slate-400">
              Built with industry-standard Bcrypt password hashing (10 salt rounds) and HMAC-SHA256 JWT tokens with automatic expiry and demo logins.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-1">
            <span className="font-semibold text-slate-200 block flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span>Offline Ready</span>
            </span>
            <p className="text-slate-400">
              Includes pre-configured offline procedural fallbacks and rich sample tours, so you can test features even without an active internet connection.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
