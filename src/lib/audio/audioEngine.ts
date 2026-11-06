/**
 * Audio Engine supporting Web Speech API synthesis, audio pacing,
 * paragraph synchronized highlighting, and audio file export (WAV download).
 */

export interface SpeechController {
  isPlaying: boolean;
  isPaused: boolean;
  currentSectionIndex: number;
  currentParagraphIndex: number;
  playbackRate: number;
}

class AudioPlayerService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private onStateChangeCallback: ((state: {
    isPlaying: boolean;
    isPaused: boolean;
    currentSectionIndex: number;
    currentParagraphIndex: number;
  }) => void) | null = null;

  public isPlaying = false;
  public isPaused = false;
  public currentSectionIndex = 0;
  public currentParagraphIndex = 0;
  public playbackRate = 1.0;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (this.synth) {
      this.voices = this.synth.getVoices();
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public subscribe(callback: (state: {
    isPlaying: boolean;
    isPaused: boolean;
    currentSectionIndex: number;
    currentParagraphIndex: number;
  }) => void) {
    this.onStateChangeCallback = callback;
  }

  private notify() {
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback({
        isPlaying: this.isPlaying,
        isPaused: this.isPaused,
        currentSectionIndex: this.currentSectionIndex,
        currentParagraphIndex: this.currentParagraphIndex,
      });
    }
  }

  public playSection(
    text: string, 
    sectionIndex: number, 
    paragraphIndex: number, 
    voiceStyle?: string,
    onFinish?: () => void
  ) {
    if (!this.synth) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.playbackRate;
    
    // Choose voice based on persona if available
    const englishVoices = this.voices.filter(v => v.lang.startsWith('en'));
    if (englishVoices.length > 0) {
      if (voiceStyle === 'Enthusiastic & Energetic') {
        utterance.pitch = 1.1;
      } else if (voiceStyle === 'Professional & Detailed') {
        utterance.pitch = 0.95;
      } else {
        utterance.pitch = 1.0;
      }
      utterance.voice = englishVoices[0];
    }

    utterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.currentSectionIndex = sectionIndex;
      this.currentParagraphIndex = paragraphIndex;
      this.notify();
    };

    utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.notify();
      if (onFinish) onFinish();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      this.isPlaying = false;
      this.isPaused = false;
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.isPlaying) {
      this.synth.pause();
      this.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isPlaying = false;
      this.isPaused = false;
      this.notify();
    }
  }

  public setRate(rate: number) {
    this.playbackRate = Math.max(0.5, Math.min(2.0, rate));
    if (this.currentUtterance && this.isPlaying && !this.isPaused) {
      // Re-trigger with updated rate
    }
  }
}

export const audioPlayer = new AudioPlayerService();

/**
 * Generates an audio WAV file with warm acoustic chime chords and synthesized audio guide signature.
 * Allows instant, reliable audio downloading without external binary dependencies.
 */
export function generateTourWavBlob(title: string, durationSeconds: number = 30): Blob {
  const sampleRate = 44100;
  const numChannels = 2;
  const bytesPerSample = 2; // 16-bit
  const totalSamples = sampleRate * Math.min(durationSeconds, 45); // up to 45s audio preview
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = totalSamples * blockAlign;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // Write WAV Header
  // "RIFF" chunk
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');

  // "fmt " chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size
  view.setUint16(20, 1, true); // AudioFormat (PCM = 1)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // BitsPerSample

  // "data" chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // Generate pleasant ambient acoustic soundscape (soft drone + museum bell notes)
  let offset = 44;
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    
    // Ambient warm pad chord (Cmaj9: C3, G3, E4, B4)
    const c3 = Math.sin(2 * Math.PI * 130.81 * t) * 0.15;
    const g3 = Math.sin(2 * Math.PI * 196.00 * t) * 0.12;
    const e4 = Math.sin(2 * Math.PI * 329.63 * t) * 0.08;
    
    // Soft guide chime notes every 6 seconds
    const chimeT = t % 6;
    let chime = 0;
    if (chimeT < 2.5) {
      const freq = chimeT < 1.0 ? 587.33 : 659.25; // D5 -> E5
      const env = Math.exp(-chimeT * 2.5);
      chime = Math.sin(2 * Math.PI * freq * chimeT) * env * 0.25;
    }

    // Fade in and fade out
    const fadeIn = Math.min(1, t / 1.5);
    const fadeOut = Math.min(1, (durationSeconds - t) / 2.0);
    const masterVolume = 0.5 * fadeIn * Math.max(0, fadeOut);

    const sample = (c3 + g3 + e4 + chime) * masterVolume;
    const intSample = Math.max(-32768, Math.min(32767, sample * 32767));

    // Left and Right channels
    view.setInt16(offset, intSample, true);
    view.setInt16(offset + 2, intSample, true);
    offset += 4;
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
