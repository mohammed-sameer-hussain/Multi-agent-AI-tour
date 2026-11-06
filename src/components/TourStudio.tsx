import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Sliders, 
  Mic2, 
  Sparkles, 
  ChevronRight, 
  Building2, 
  Landmark, 
  UtensilsCrossed, 
  Palette, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  Volume2
} from 'lucide-react';
import { InterestCategory, VoiceStyle, Tour, AgentStepStatus } from '../lib/types.ts';
import { calculateWordBudget, formatDuration } from '../lib/agents/planner.ts';

interface TourStudioProps {
  onTourGenerated: (tour: Tour) => void;
  onExploreSample: (tourId: string) => void;
}

const PRESET_LOCATIONS = [
  { name: 'Colosseum & Roman Forum', city: 'Rome, Italy' },
  { name: 'Gothic Quarter (Barri Gòtic)', city: 'Barcelona, Spain' },
  { name: 'Gion District & Kennin-ji', city: 'Kyoto, Japan' },
  { name: 'Piazza del Duomo & Uffizi', city: 'Florence, Italy' },
  { name: 'Montmartre & Sacré-Cœur', city: 'Paris, France' },
  { name: 'Old Town & Royal Mile', city: 'Edinburgh, Scotland' }
];

const INTEREST_CONFIGS: { category: InterestCategory; label: string; icon: any; desc: string }[] = [
  { 
    category: 'Architecture', 
    label: 'Architecture', 
    icon: Building2, 
    desc: 'Engineering feats, stone facades, Gothic & Modernist design elements' 
  },
  { 
    category: 'History', 
    label: 'History', 
    icon: Landmark, 
    desc: 'Archival stories, empires, pivotal revolutions, and historic legends' 
  },
  { 
    category: 'Culture', 
    label: 'Culture & Arts', 
    icon: Palette, 
    desc: 'Living customs, music, artisan quarters, and neighborhood atmosphere' 
  },
  { 
    category: 'Culinary', 
    label: 'Culinary Traditions', 
    icon: UtensilsCrossed, 
    desc: 'Historic street food, regional delicacies, markets, and flavor origins' 
  }
];

export function TourStudio({ onTourGenerated, onExploreSample }: TourStudioProps) {
  const [location, setLocation] = useState('Colosseum & Roman Forum, Rome');
  const [interests, setInterests] = useState<InterestCategory[]>(['History', 'Architecture']);
  const [duration, setDuration] = useState<number>(15);
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>('Friendly & Casual');
  
  // Multi-agent execution state
  const [isGenerating, setIsGenerating] = useState(false);
  const [agentSteps, setAgentSteps] = useState<AgentStepStatus[]>([]);
  const [activeAgentMessage, setActiveAgentMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const budget = calculateWordBudget(duration, interests);

  const toggleInterest = (category: InterestCategory) => {
    if (interests.includes(category)) {
      if (interests.length === 1) return; // Keep at least one
      setInterests(interests.filter(i => i !== category));
    } else {
      setInterests([...interests, category]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      setError('Please specify a tour location or landmark.');
      return;
    }

    setError(null);
    setIsGenerating(true);
    setAgentSteps([]);
    setActiveAgentMessage('Initializing Multi-Agent Orchestration Engine...');

    try {
      // Setup initial simulated steps for UI responsiveness
      const initialSteps: AgentStepStatus[] = [
        {
          id: 'step-planner',
          name: 'PlannerAgent',
          role: 'Time & Resource Allocator',
          status: 'running',
          message: `Evaluating ${location} and apportioning ${duration} minutes across ${interests.length} domains...`,
          timestamp: Date.now()
        }
      ];
      setAgentSteps(initialSteps);

      const res = await fetch('/api/tours/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: location.trim(),
          interests,
          durationMinutes: duration,
          voiceStyle
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate tour');
      }

      // Populate completed agent steps from server response
      if (data.agentSteps && data.agentSteps.length > 0) {
        setAgentSteps(data.agentSteps);
      } else {
        // Fallback agent steps summary
        setAgentSteps([
          {
            id: 'step-planner',
            name: 'PlannerAgent',
            role: 'Time Allocator',
            status: 'completed',
            message: `Allocated ${budget.totalWords} words (~150 words/min) across ${interests.join(', ')}.`,
            timestamp: Date.now()
          },
          ...interests.map(i => ({
            id: `step-${i.toLowerCase()}`,
            name: `${i}Agent`,
            role: `${i} Specialist`,
            status: 'completed' as const,
            message: `Synthesized spoken ${i.toLowerCase()} narration with archival details.`,
            timestamp: Date.now()
          })),
          {
            id: 'step-orchestrator',
            name: 'OrchestratorAgent',
            role: 'Tour Director',
            status: 'completed',
            message: `Assembled ${data.tour.sections.length} audio sections with seamless walk transitions.`,
            timestamp: Date.now()
          }
        ]);
      }

      // Small pause to allow user to admire the completed steps
      setTimeout(() => {
        setIsGenerating(false);
        onTourGenerated(data.tour);
      }, 700);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error occurred while running specialist agents.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      
      {/* Hero Welcome banner */}
      <div className="mb-8 lg:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multi-Agent Self-Guided Audio Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight">
          Craft Your Bespoke AI Audio Tour
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Four specialist voice agents collaborate in real-time to analyze your destination, weave historical narratives, dissect architectural wonders, and uncover hidden culinary secrets.
        </p>

        {/* Quick sample launch pills */}
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="font-medium text-slate-300">Quick-load curated tours:</span>
          <button
            type="button"
            onClick={() => onExploreSample('tour-barcelona-gothic')}
            className="hover:text-amber-400 hover:underline transition-colors"
          >
            Barcelona Gothic Quarter
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => onExploreSample('tour-kyoto-ancient')}
            className="hover:text-amber-400 hover:underline transition-colors"
          >
            Kyoto Gion District
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => onExploreSample('tour-florence-renaissance')}
            className="hover:text-amber-400 hover:underline transition-colors"
          >
            Florence Renaissance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleGenerate} className="space-y-6">
            
            {/* Step 1: Location */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white flex items-center gap-2" htmlFor="tour-location">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Where would you like to explore?</span>
                </label>
                <span className="text-xs text-slate-400">Landmark, neighborhood, or city</span>
              </div>
              <div className="relative">
                <input
                  id="tour-location"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Roman Colosseum & Forum, Rome"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 shadow-inner"
                />
              </div>

              {/* Presets */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {PRESET_LOCATIONS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setLocation(`${preset.name}, ${preset.city}`)}
                    className="text-[11px] px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800/80 transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Specialist Interests */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>Select Specialist Agent Domains</span>
                </label>
                <span className="text-xs text-slate-400">{interests.length} selected</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTEREST_CONFIGS.map((config) => {
                  const Icon = config.icon;
                  const isSelected = interests.includes(config.category);
                  return (
                    <button
                      key={config.category}
                      type="button"
                      onClick={() => toggleInterest(config.category)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 group ${
                        isSelected
                          ? 'bg-amber-950/20 border-amber-500/60 shadow-sm shadow-amber-950/30'
                          : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className={`p-2 rounded-lg mt-0.5 ${
                        isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-semibold ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                            {config.label}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-snug">
                          {config.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Tour Duration & Pacing */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-white">Target Tour Duration</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-amber-400 font-bold">{formatDuration(duration)}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">~{budget.totalWords} words (150 wpm)</span>
                </div>
              </div>

              <input
                type="range"
                min={5}
                max={60}
                step={5}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                aria-label="Tour Duration in minutes"
              />

              <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
                <span>5m (Bite-sized)</span>
                <span>15m (Recommended)</span>
                <span>30m (In-depth)</span>
                <span>60m (Comprehensive)</span>
              </div>
            </div>

            {/* Step 4: Voice Style & Personality */}
            <div>
              <label className="text-sm font-semibold text-white flex items-center gap-2 mb-2" htmlFor="tour-voice-style">
                <Mic2 className="w-4 h-4 text-amber-400" />
                <span>Guide Persona & Voice Tone</span>
              </label>

              <select
                id="tour-voice-style"
                value={voiceStyle}
                onChange={(e) => setVoiceStyle(e.target.value as VoiceStyle)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="Friendly & Casual">Friendly & Casual — Warm local friend walking beside you</option>
                <option value="Professional & Detailed">Professional & Detailed — Scholarly docent and architectural historian</option>
                <option value="Enthusiastic & Energetic">Enthusiastic & Energetic — Passionate storyteller with infectious sensory flair</option>
              </select>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="p-3.5 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Primary Generate Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-base transition-all shadow-lg shadow-amber-950/40 flex items-center justify-center gap-3 disabled:opacity-50 group cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Multi-Agent System Generating Tour...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Generate Audio Tour ({formatDuration(duration)})</span>
                  <ChevronRight className="w-5 h-5 ml-auto" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Info & Live Stepper Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Multi-Agent Architecture Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Multi-Agent Orchestration Flow</span>
            </h2>

            {isGenerating || agentSteps.length > 0 ? (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs">
                  <span className="text-amber-400 font-mono font-medium block mb-1">Status:</span>
                  <p className="text-slate-300 font-mono animate-pulse">
                    {activeAgentMessage || 'Agents actively conversing & generating sections...'}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {agentSteps.map((step, sIdx) => (
                    <div 
                      key={`${step.id}-${step.status}-${sIdx}`} 
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200">{step.name}</span>
                        {step.status === 'completed' ? (
                          <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Done</span>
                          </span>
                        ) : (
                          <span className="text-amber-400 flex items-center gap-1 font-mono text-[11px]">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Working</span>
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 mt-1">{step.message}</p>
                      {step.outputPreview && (
                        <p className="text-[11px] text-slate-500 italic mt-1.5 border-t border-slate-900 pt-1">
                          "{step.outputPreview}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <span className="font-semibold text-amber-300 block mb-0.5">1. Planner Agent</span>
                  <p className="text-slate-400">Calculates precise minute-by-minute time distribution and word caps for optimal spoken pacing.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <span className="font-semibold text-amber-300 block mb-0.5">2. Specialist Agents</span>
                  <p className="text-slate-400">Four targeted AI models (Architecture, History, Culture, Culinary) conduct domain research with zero fluff.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <span className="font-semibold text-amber-300 block mb-0.5">3. Orchestrator Agent</span>
                  <p className="text-slate-400">Synthesizes the expert narratives with natural walk transitions, waypoints, and expressive introductions.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <span className="font-semibold text-amber-300 block mb-0.5">4. Speech & Export Engine</span>
                  <p className="text-slate-400">Renders high-quality audio narration with real-time text synchronization and downloadable audio files.</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Specs summary */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/70 text-xs">
            <h3 className="font-semibold text-slate-200 mb-2">Engine Specifications</h3>
            <div className="space-y-1.5 text-slate-400 font-mono text-[11px]">
              <div className="flex justify-between">
                <span>Speaking Rate:</span>
                <span className="text-slate-200">150 words/minute</span>
              </div>
              <div className="flex justify-between">
                <span>Model Engine:</span>
                <span className="text-slate-200">Gemini 2.5 Flash</span>
              </div>
              <div className="flex justify-between">
                <span>Audio Engine:</span>
                <span className="text-slate-200">Web Speech API + WAV</span>
              </div>
              <div className="flex justify-between">
                <span>Security:</span>
                <span className="text-slate-200">Bcrypt + JWT Protected</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
