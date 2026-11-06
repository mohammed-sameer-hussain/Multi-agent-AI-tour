import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Download, 
  Bookmark, 
  BookmarkCheck, 
  MapPin, 
  Clock, 
  Volume2, 
  Sparkles, 
  Share2, 
  FileText, 
  Check, 
  ChevronRight,
  ListMusic,
  Compass
} from 'lucide-react';
import { Tour, TourSection, Waypoint } from '../lib/types.ts';
import { audioPlayer, generateTourWavBlob, CURATED_VOICES, VoicePersona } from '../lib/audio/audioEngine.ts';
import { useAuth } from '../lib/auth/AuthContext.tsx';
import { TourRouteMap } from './TourRouteMap.tsx';

interface TourPlayerProps {
  tour: Tour;
  onBackToStudio: () => void;
  onOpenAuth: () => void;
}

function getGuideName(agentName: string): string {
  const lower = agentName.toLowerCase();
  if (lower.includes('orchestrator')) return 'Lead Audio Guide';
  if (lower.includes('hist')) return 'History Specialist';
  if (lower.includes('arch')) return 'Architecture Specialist';
  if (lower.includes('cult')) return 'Culture & Arts Specialist';
  if (lower.includes('culin')) return 'Local Food Specialist';
  return 'Tour Guide';
}

export function TourPlayer({ tour, onBackToStudio, onOpenAuth }: TourPlayerProps) {
  const { user, isTourSaved, toggleSaveTour } = useAuth();
  
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeParagraphIndex, setActiveParagraphIndex] = useState(0);
  const [activeVoiceId, setActiveVoiceId] = useState(audioPlayer.activeVoiceId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [copied, setCopied] = useState(false);
  const [downloadingAudio, setDownloadingAudio] = useState(false);

  const activeSection = tour.sections[activeSectionIndex] || tour.sections[0];
  const isSaved = isTourSaved(tour.id);

  // Subscribe to audio engine updates
  useEffect(() => {
    audioPlayer.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsPaused(state.isPaused);
      setActiveVoiceId(state.activeVoiceId);
      if (state.currentSectionIndex >= 0 && state.currentSectionIndex < tour.sections.length) {
        setActiveSectionIndex(state.currentSectionIndex);
        setActiveParagraphIndex(state.currentParagraphIndex);
      }
    });

    return () => {
      audioPlayer.stop();
    };
  }, [tour]);

  // Handle Play / Pause
  const handleTogglePlay = () => {
    if (isPlaying && !isPaused) {
      audioPlayer.pause();
    } else if (isPaused) {
      audioPlayer.resume();
    } else {
      playCurrentSection(activeSectionIndex, activeParagraphIndex);
    }
  };

  const playCurrentSection = (sectionIndex: number, startParagraphIndex: number = 0) => {
    const sec = tour.sections[sectionIndex];
    if (!sec) return;

    const paragraphs = (sec.paragraphs && sec.paragraphs.length > 0) 
      ? sec.paragraphs 
      : [sec.content];

    audioPlayer.playSection(
      paragraphs, 
      sectionIndex, 
      startParagraphIndex,
      () => {
        // When section finishes, advance to next section if available
        if (sectionIndex + 1 < tour.sections.length) {
          playCurrentSection(sectionIndex + 1, 0);
        }
      }
    );
  };

  const handleVoiceChange = (voiceId: string) => {
    setActiveVoiceId(voiceId);
    audioPlayer.setVoicePersona(voiceId);
    if (isPlaying) {
      playCurrentSection(activeSectionIndex, activeParagraphIndex);
    }
  };

  const handleSelectSection = (index: number) => {
    setActiveSectionIndex(index);
    setActiveParagraphIndex(0);
    if (isPlaying) {
      playCurrentSection(index, 0);
    }
  };

  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    audioPlayer.setRate(rate);
  };

  // Download Audio Tour as .wav file
  const handleDownloadAudio = () => {
    setDownloadingAudio(true);
    try {
      const blob = generateTourWavBlob(tour.title, tour.durationMinutes * 60);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${tour.location.toLowerCase().replace(/[^a-z0-9]/g, '_')}_tour.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Audio download error:', err);
    } finally {
      setTimeout(() => setDownloadingAudio(false), 800);
    }
  };

  // Copy full script as formatted Markdown
  const handleCopyScript = () => {
    const markdown = `# ${tour.title}
**Location:** ${tour.location}
**Duration:** ${tour.durationMinutes} minutes
**Interests:** ${tour.interests.join(', ')}
**Voice Style:** ${tour.voiceStyle}

---

${tour.sections.map(s => `## ${s.title} (${s.category} - ${s.agentName})
${s.content}
`).join('\n\n')}
`;

    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSave = () => {
    if (!user) {
      onOpenAuth();
      return;
    }
    toggleSaveTour(tour.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <button
            onClick={onBackToStudio}
            className="text-xs text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 mb-1.5 group"
          >
            <span>← Back to Studio</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-semibold">{tour.location}</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">{tour.estimatedListeningTime || `${tour.durationMinutes} min`} tour</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mt-1">
            {tour.title}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleToggleSave}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              isSaved
                ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? 'Saved in Library' : 'Save Tour'}</span>
          </button>

          <button
            onClick={handleCopyScript}
            className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 transition-colors flex items-center gap-1.5"
            title="Copy Tour Transcript Markdown"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <FileText className="w-4 h-4 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Script'}</span>
          </button>

          <button
            onClick={handleDownloadAudio}
            disabled={downloadingAudio}
            className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm shadow-amber-950/40 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloadingAudio ? 'Exporting...' : 'Download Audio'}</span>
          </button>
        </div>
      </div>

      {/* Persistent Audio Player Bar */}
      <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Glow ambient accent */}
        <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left: Current Track info */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={handleTogglePlay}
              className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-950/50 transition-all hover:scale-105 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
              aria-label={isPlaying && !isPaused ? "Pause Audio" : "Play Audio"}
            >
              {isPlaying && !isPaused ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current translate-x-0.5" />
              )}
            </button>

            <div className="min-w-0">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                Chapter {activeSectionIndex + 1} of {tour.sections.length} · {activeSection.category}
              </span>
              <h2 className="text-base font-bold text-white truncate max-w-sm sm:max-w-md">
                {activeSection.title}
              </h2>
              <p className="text-xs text-slate-400">
                Narrated by <span className="text-slate-300">{getGuideName(activeSection.agentName)}</span> · {tour.voiceStyle}
              </p>
            </div>
          </div>

          {/* Right: Audio Speed & Sound wave status */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0">
            
            {/* Speed toggle */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {[0.75, 1.0, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handleRateChange(rate)}
                  className={`px-2 py-1 text-[11px] font-mono rounded font-semibold transition-colors ${
                    playbackRate === rate
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* Audio wave indicator */}
            <div className="flex items-center gap-1.5 h-6 px-3 bg-slate-950 rounded-lg border border-slate-800">
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <div className="flex items-center gap-0.5">
                {[0.4, 0.8, 0.5, 0.9, 0.3].map((h, i) => (
                  <span
                    key={i}
                    className={`w-0.5 bg-amber-400 rounded-full transition-all duration-300 ${
                      isPlaying && !isPaused ? 'animate-pulse' : 'opacity-40'
                    }`}
                    style={{ height: isPlaying && !isPaused ? `${h * 16}px` : '4px' }}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Voice Clarity & Persona Selector Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Narrator Voice:</span>
            </span>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {CURATED_VOICES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleVoiceChange(v.id)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    activeVoiceId === v.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                  title={`${v.name}: ${v.description}`}
                >
                  {v.name}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => audioPlayer.previewVoice(activeVoiceId)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Test this clear voice speaking a preview sample"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Test Voice</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px] bg-slate-950/60 px-2.5 py-1 rounded border border-slate-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>HD Clear Professional Voice · Natural Pacing</span>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1">
          {tour.sections.map((sec, idx) => {
            const isActive = idx === activeSectionIndex;
            return (
              <button
                key={sec.id}
                onClick={() => handleSelectSection(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                <span className="font-mono text-[10px] text-amber-400/80">0{idx + 1}</span>
                <span>{sec.category}</span>
                <span className="text-[10px] text-slate-500 font-mono">({sec.durationMinutes}m)</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Dual-Pane Tour View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Vector Route Map & Waypoint Explorer (5 cols) */}
        <div className="lg:col-span-5">
          <TourRouteMap
            waypoints={tour.waypoints}
            activeWaypointIndex={activeSectionIndex}
            onSelectWaypoint={(index) => {
              const targetSec = Math.min(index, tour.sections.length - 1);
              handleSelectSection(targetSec);
            }}
            tourLocation={tour.location}
          />
        </div>

        {/* Right Column: Active Narrative Reader (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          
          {/* Chapter header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                  {getGuideName(activeSection.agentName)}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {activeSection.wordCount} words · ~{activeSection.durationMinutes} min read
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-2">
                {activeSection.title}
              </h2>
            </div>

            <button
              onClick={() => playCurrentSection(activeSectionIndex, 0)}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Read Aloud</span>
            </button>
          </div>

          {/* Key Takeaways Highlights */}
          {activeSection.keyHighlights && activeSection.keyHighlights.length > 0 && (
            <div className="my-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-2">
                Key Sights & Observations
              </span>
              <ul className="space-y-1.5">
                {activeSection.keyHighlights.map((hl, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-amber-500 font-bold">·</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Spoken Narration Paragraphs */}
          <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed font-serif pt-2">
            {activeSection.paragraphs.map((paragraph, pIdx) => {
              const isCurrentPlaying = isPlaying && activeParagraphIndex === pIdx;
              return (
                <div 
                  key={pIdx}
                  onClick={() => playCurrentSection(activeSectionIndex, pIdx)}
                  className={`p-3.5 rounded-xl transition-all duration-300 cursor-pointer border ${
                    isCurrentPlaying
                      ? 'bg-amber-500/15 border-amber-500/80 text-white shadow-lg shadow-amber-950/20 ring-1 ring-amber-500/30 font-medium'
                      : 'border-transparent hover:border-slate-800 hover:bg-slate-950/40'
                  }`}
                  title="Click to hear this paragraph"
                >
                  <p>{paragraph}</p>
                </div>
              );
            })}
          </div>

          {/* Section footer navigation */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              disabled={activeSectionIndex === 0}
              onClick={() => handleSelectSection(activeSectionIndex - 1)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
            >
              ← Previous Chapter
            </button>

            <span className="text-xs font-mono text-slate-500">
              {activeSectionIndex + 1} / {tour.sections.length}
            </span>

            <button
              disabled={activeSectionIndex === tour.sections.length - 1}
              onClick={() => handleSelectSection(activeSectionIndex + 1)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
            >
              Next Chapter →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
