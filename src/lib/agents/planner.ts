import { InterestCategory, TimeAllocation, WordBudget } from '../types.ts';

export const WORDS_PER_MINUTE = 150;

/**
 * Calculates optimal time allocation across sections based on tour duration and selected interests.
 * Ensures minimum thresholds and respects user-selected weights.
 */
export function calculateTimeAllocation(
  durationMinutes: number,
  selectedInterests: InterestCategory[]
): TimeAllocation {
  const duration = Math.max(5, Math.min(120, durationMinutes));
  const activeInterests = selectedInterests.length > 0 
    ? selectedInterests 
    : (['History', 'Architecture', 'Culture', 'Culinary'] as InterestCategory[]);

  // Reserve intro and conclusion
  let introTime = 1;
  let conclusionTime = 1;

  if (duration >= 45) {
    introTime = 2.0;
    conclusionTime = 2.0;
  } else if (duration >= 25) {
    introTime = 1.5;
    conclusionTime = 1.5;
  } else if (duration >= 10) {
    introTime = 1.0;
    conclusionTime = 1.0;
  } else {
    introTime = 0.5;
    conclusionTime = 0.5;
  }

  const contentTime = Math.max(2, duration - introTime - conclusionTime);
  const count = activeInterests.length;
  const timePerSelected = parseFloat((contentTime / count).toFixed(1));

  const allocation: TimeAllocation = {
    introduction: introTime,
    architecture: 0,
    history: 0,
    culture: 0,
    culinary: 0,
    conclusion: conclusionTime,
  };

  if (activeInterests.includes('Architecture')) {
    allocation.architecture = timePerSelected;
  }
  if (activeInterests.includes('History')) {
    allocation.history = timePerSelected;
  }
  if (activeInterests.includes('Culture')) {
    allocation.culture = timePerSelected;
  }
  if (activeInterests.includes('Culinary')) {
    allocation.culinary = timePerSelected;
  }

  return allocation;
}

/**
 * Calculates strict word budgets for each active section using standard 150 words-per-minute audio pacing.
 */
export function calculateWordBudget(
  durationMinutes: number,
  selectedInterests: InterestCategory[]
): WordBudget {
  const totalWords = Math.round(durationMinutes * WORDS_PER_MINUTE);
  const allocation = calculateTimeAllocation(durationMinutes, selectedInterests);

  const sectionWords: Record<string, number> = {
    introduction: Math.round(allocation.introduction * WORDS_PER_MINUTE),
    conclusion: Math.round(allocation.conclusion * WORDS_PER_MINUTE),
  };

  if (selectedInterests.includes('Architecture')) {
    sectionWords.architecture = Math.round(allocation.architecture * WORDS_PER_MINUTE);
  }
  if (selectedInterests.includes('History')) {
    sectionWords.history = Math.round(allocation.history * WORDS_PER_MINUTE);
  }
  if (selectedInterests.includes('Culture')) {
    sectionWords.culture = Math.round(allocation.culture * WORDS_PER_MINUTE);
  }
  if (selectedInterests.includes('Culinary')) {
    sectionWords.culinary = Math.round(allocation.culinary * WORDS_PER_MINUTE);
  }

  return {
    totalWords,
    wordsPerMinute: WORDS_PER_MINUTE,
    sectionWords,
  };
}

/**
 * Formats a duration in minutes into a human-readable string (e.g. "15 min", "1 hr 10 min").
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)} min`;
  }
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
}
