import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
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
  Volume2,
  Footprints,
  Coffee,
  Camera,
  Navigation
} from 'lucide-react';
import { InterestCategory, VoiceStyle, Tour, AgentStepStatus } from '../lib/types.ts';
import { calculateWordBudget, formatDuration } from '../lib/agents/planner.ts';
import { audioPlayer } from '../lib/audio/audioEngine.ts';

interface TourStudioProps {
  onTourGenerated: (tour: Tour) => void;
  onExploreSample: (tourId: string) => void;
}

const PRESET_LOCATIONS = [
  { name: 'City Palace & Hawa Mahal', city: 'Jaipur, India' },
  { name: 'Amba Vilas Palace', city: 'Mysore, India' },
  { name: 'Colosseum & Roman Forum', city: 'Rome, Italy' },
  { name: 'Gothic Quarter (Barri Gòtic)', city: 'Barcelona, Spain' },
  { name: 'Gion District & Shrines', city: 'Kyoto, Japan' },
  { name: 'Piazza del Duomo & Uffizi', city: 'Florence, Italy' },
  { name: 'City Palace of Mewar', city: 'Udaipur, India' },
  { name: 'Montmartre & Sacré-Cœur', city: 'Paris, France' }
];

const INTEREST_CONFIGS: { category: InterestCategory; label: string; icon: any; desc: string }[] = [
  { 
    category: 'History', 
    label: 'History & Legends', 
    icon: Landmark, 
    desc: 'Ancient stories, revolutions, pivotal moments, and forgotten local lore' 
  },
  { 
    category: 'Architecture', 
    label: 'Architecture & Sights', 
    icon: Building2, 
    desc: 'Famous facades, cathedral spires, stone masonry, and design details' 
  },
  { 
    category: 'Culture', 
    label: 'Culture & Daily Life', 
    icon: Palette, 
    desc: 'Neighborhood vibe, living traditions, artisan studios, and music' 
  },
  { 
    category: 'Culinary', 
    label: 'Food & Historic Markets', 
    icon: UtensilsCrossed, 
    desc: 'Street specialties, centuries-old recipes, market stalls, and regional flavors' 
  }
];

const FAMOUS_DESTINATIONS = [
  {
    id: 'tour-jaipur-city-palace',
    title: 'Jaipur: Royal Courtyards of City Palace & Hawa Mahal',
    city: 'Jaipur, Rajasthan, India',
    highlight: '953 pink sandstone jharokha windows, peacock gates, and royal Rajasthani saffron sweets.',
    duration: '15 min walk',
    tag: 'Rajput Royalty'
  },
  {
    id: 'tour-mysore-palace',
    title: 'Mysore: Golden Splendor of Amba Vilas Palace',
    city: 'Mysore, Karnataka, India',
    highlight: 'Wadiyar dynasty throne halls, Glasgow peacock stained glass, and authentic Mysore Pak.',
    duration: '15 min walk',
    tag: 'Royal Heritage'
  },
  {
    id: 'tour-barcelona-gothic',
    title: 'Barcelona: Gothic Quarter & Medieval Alleys',
    city: 'Barcelona, Spain',
    highlight: 'Roman walls, 14th-century cathedral courtyards, and lively tapas taverns.',
    duration: '15 min walk',
    tag: 'Medieval & Modernist'
  },
  {
    id: 'tour-kyoto-ancient',
    title: 'Kyoto: Gion Teahouses & Zen Shrines',
    city: 'Kyoto, Japan',
    highlight: 'Preserved wooden machiya facades, peaceful rock gardens, and lantern-lit stone paths.',
    duration: '15 min walk',
    tag: 'Ancient Heritage'
  },
  {
    id: 'tour-florence-renaissance',
    title: 'Florence: Renaissance Wonders of the Medici',
    city: 'Florence, Italy',
    highlight: 'Brunelleschi\'s cathedral dome, Ponte Vecchio goldsmiths, and authentic Tuscan cuisine.',
    duration: '15 min walk',
    tag: 'Renaissance Art'
  }
];

export function TourStudio({ onTourGenerated, onExploreSample }: TourStudioProps) {
  const [location, setLocation] = useState('Colosseum & Roman Forum, Rome');
  const [interests, setInterests] = useState<InterestCategory[]>(['History', 'Architecture']);
  const [duration, setDuration] = useState<number>(15);
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>('Clear & Professional Docent');
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSteps, setGenerationSteps] = useState<{ id: string; title: string; status: 'running' | 'completed'; desc: string }[]>([]);
  const [currentStepMessage, setCurrentStepMessage] = useState<string>('');
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
      setError('Please enter a landmark or historic destination.');
      return;
    }

    setError(null);
    setIsGenerating(true);
    setCurrentStepMessage(`Discovering historic highlights of ${location.trim()}...`);
    
    // Human-understandable tour guide creation steps
    setGenerationSteps([
      {
        id: 'step-plan',
        title: 'Planning Walking Route & Time',
        status: 'running',
        desc: `Pacing a comfortable ${duration}-minute walk with stops at key viewpoints.`
      }
    ]);

    try {
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

      // Friendly completed travel steps
      setGenerationSteps([
        {
          id: 'step-plan',
          title: 'Route Planned',
          status: 'completed',
          desc: `Prepared a ${duration}-minute walking route focusing on ${interests.join(' and ')}.`
        },
        {
          id: 'step-stories',
          title: 'Historical Stories & Sights Curated',
          status: 'completed',
          desc: `Researched iconic landmarks, hidden details, and authentic stories.`
        },
        {
          id: 'step-audio',
          title: 'Spoken Narration Ready',
          status: 'completed',
          desc: `Generated natural, conversational audio narration with walking directions.`
        }
      ]);

      setTimeout(() => {
        setIsGenerating(false);
        onTourGenerated(data.tour);
      }, 700);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error occurred while creating your audio tour.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      
      {/* Hero Welcome banner */}
      <div className="mb-8 lg:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs font-medium mb-3">
          <Footprints className="w-3.5 h-3.5" />
          <span>Self-Guided Audio Walking Tours</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight">
          Explore Historic Places with a Personal Guide in Your Pocket
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Type any monument, historic city, or picturesque neighborhood to get an engaging, spoken walking tour. Learn the stories behind ancient stone walls, cathedral facades, and local culinary traditions at your own pace.
        </p>

        {/* Quick sample launch pills */}
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="font-medium text-slate-300">Quick-load popular walks:</span>
          <button
            type="button"
            onClick={() => onExploreSample('tour-jaipur-city-palace')}
            className="hover:text-amber-400 hover:underline transition-colors text-amber-300 font-medium"
          >
            Jaipur City Palace & Hawa Mahal
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => onExploreSample('tour-mysore-palace')}
            className="hover:text-amber-400 hover:underline transition-colors text-amber-300 font-medium"
          >
            Mysore Amba Vilas Palace
          </button>
          <span>·</span>
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
            Kyoto Gion & Shrines
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
            
            {/* Step 1: Destination / Location */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white flex items-center gap-2" htmlFor="tour-location">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Where are you exploring?</span>
                </label>
                <span className="text-xs text-slate-400">Landmark, district, or town</span>
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

              {/* Popular Historic Landmarks Presets */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {PRESET_LOCATIONS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setLocation(`${preset.name}, ${preset.city}`)}
                    className="text-[11px] px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800/80 transition-colors cursor-pointer"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Interests / Topics */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>What would you like to discover on this walk?</span>
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
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 group cursor-pointer ${
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

            {/* Step 3: Walking Duration */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-white">Walking Tour Duration</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-amber-400 font-bold font-mono">{formatDuration(duration)}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">Comfortable walking pace</span>
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
                aria-label="Walking Tour Duration in minutes"
              />

              <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
                <span>5m (Quick Highlight)</span>
                <span>15m (Standard Walk)</span>
                <span>30m (In-Depth Discovery)</span>
                <span>60m (Grand Tour)</span>
              </div>
            </div>

            {/* Step 4: Tour Guide Tone */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white flex items-center gap-2" htmlFor="tour-voice-style">
                  <Mic2 className="w-4 h-4 text-amber-400" />
                  <span>Guide's Speaking Style & Voice</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const voiceId = voiceStyle.includes('Scholarly') ? 'david' : voiceStyle.includes('Enthusiastic') ? 'julian' : 'serena';
                    audioPlayer.previewVoice(voiceId);
                  }}
                  className="text-xs text-amber-300 hover:text-amber-200 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 hover:border-amber-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Test how clear and natural this voice sounds"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Test Voice</span>
                </button>
              </div>

              <select
                id="tour-voice-style"
                value={voiceStyle}
                onChange={(e) => setVoiceStyle(e.target.value as VoiceStyle)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="Clear & Professional Docent">Serena (Clear & Professional Docent) — Crystal-clear, elegant British museum docent tone</option>
                <option value="Warm & Scholarly">David (Warm & Scholarly) — Rich baritone, eloquent historian with crisp articulation</option>
                <option value="Friendly & Casual">Aria (Friendly & Modern) — Engaging, insightful conversational guide</option>
                <option value="Professional & Detailed">Scholarly & Detailed — Formal historian highlighting architectural dates and methods</option>
                <option value="Enthusiastic & Energetic">Julian (Enthusiastic Storyteller) — Passionate, vivid narrator full of local lore</option>
              </select>
              <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Features natural sentence pacing, clear enunciation, and interactive paragraph sync.</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-base transition-all shadow-lg shadow-amber-950/40 flex items-center justify-center gap-3 disabled:opacity-50 group cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Preparing Your Audio Walking Tour...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Create Audio Tour ({formatDuration(duration)})</span>
                  <ChevronRight className="w-5 h-5 ml-auto" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Tourist & Historical Places Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Generation in Progress State */}
          {isGenerating ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Your Personalized Guide</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentStepMessage}
              </p>

              <div className="space-y-3 pt-2">
                {generationSteps.map((step) => (
                  <div key={step.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{step.title}</span>
                      {step.status === 'completed' ? (
                        <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Ready</span>
                        </span>
                      ) : (
                        <span className="text-amber-400 flex items-center gap-1 text-[11px]">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Writing</span>
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 mt-1">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Featured Tourist & Historical Places */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-white flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-amber-400" />
                    <span>Popular Historic Walks</span>
                  </h2>
                  <span className="text-xs text-slate-400">Curated audio tours</span>
                </div>

                <div className="space-y-3">
                  {FAMOUS_DESTINATIONS.map((dest) => (
                    <div
                      key={dest.id}
                      onClick={() => onExploreSample(dest.id)}
                      className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                          {dest.title}
                        </span>
                        <span className="text-[10px] text-amber-400 font-mono">{dest.duration}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {dest.highlight}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                        <span>{dest.tag}</span>
                        <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                          Listen now →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Tourist Walking Tips */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/70 text-xs space-y-3">
                <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>Tips for Your Audio Walking Tour</span>
                </h3>

                <div className="space-y-2 text-slate-400 leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                    <p><strong className="text-slate-300">Wear Headphones:</strong> Audio tours feel truly immersive with headphones so you hear ambient details clearly.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                    <p><strong className="text-slate-300">Pause for Photos:</strong> Stop playback at any viewpoint to admire stone facades or capture memories.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                    <p><strong className="text-slate-300">Download for Offline:</strong> Traveling without cellular data? Use the "Download Audio" button to listen anywhere.</p>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
