import { TourSection, Waypoint, Tour, InterestCategory, VoiceStyle } from '../types.ts';
import { WORDS_PER_MINUTE } from './planner.ts';

export interface SectionInput {
  category: InterestCategory | 'Introduction' | 'Conclusion';
  agentName: string;
  title: string;
  content: string;
  durationMinutes: number;
  keyHighlights?: string[];
}

/**
 * Splits text into conversational paragraphs, stripping out any accidental markdown headers.
 */
export function cleanSpokenParagraphs(rawText: string): string[] {
  if (!rawText) return [];
  
  // Remove markdown headers like ## Architecture
  const cleaned = rawText
    .replace(/^#+\s.*$/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  return cleaned
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
}

/**
 * Counts words in a string accurately.
 */
export function countWords(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Assembles a complete Tour data structure with synced transcript paragraphs.
 */
export function assembleTour(params: {
  id: string;
  title: string;
  location: string;
  summary: string;
  durationMinutes: number;
  interests: InterestCategory[];
  voiceStyle: VoiceStyle;
  sectionsData: SectionInput[];
  waypoints: Waypoint[];
  userId?: string;
}): Tour {
  const sections: TourSection[] = params.sectionsData.map((sec, index) => {
    const paragraphs = cleanSpokenParagraphs(sec.content);
    const wordCount = countWords(sec.content);
    const duration = parseFloat((wordCount / WORDS_PER_MINUTE).toFixed(1));

    return {
      id: `section-${index + 1}-${sec.category.toLowerCase()}`,
      title: sec.title,
      category: sec.category,
      agentName: sec.agentName,
      durationMinutes: duration || sec.durationMinutes,
      wordCount,
      content: paragraphs.join('\n\n'),
      paragraphs,
      keyHighlights: sec.keyHighlights || extractHighlights(paragraphs),
    };
  });

  const fullScript = sections.map(s => s.content).join('\n\n');
  const totalWords = countWords(fullScript);
  const totalDurationSeconds = Math.round((totalWords / WORDS_PER_MINUTE) * 60);

  return {
    id: params.id,
    title: params.title,
    location: params.location,
    summary: params.summary,
    durationMinutes: params.durationMinutes,
    interests: params.interests,
    voiceStyle: params.voiceStyle,
    sections,
    waypoints: params.waypoints,
    fullScript,
    createdAt: new Date().toISOString(),
    userId: params.userId,
    audioGenerated: true,
    audioDurationSeconds: totalDurationSeconds,
    estimatedListeningTime: `${Math.round(totalDurationSeconds / 60)} min`,
  };
}

/**
 * Extracts 2-3 key takeaways or sights mentioned in the paragraphs.
 */
function extractHighlights(paragraphs: string[]): string[] {
  const highlights: string[] = [];
  for (const p of paragraphs) {
    const sentences = p.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 25);
    if (sentences.length > 0 && highlights.length < 3) {
      highlights.push(sentences[0]);
    }
  }
  return highlights.length > 0 ? highlights : ['Explore landmark highlights and hidden details'];
}
