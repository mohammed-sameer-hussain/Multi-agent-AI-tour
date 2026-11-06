export type InterestCategory = 'History' | 'Architecture' | 'Culture' | 'Culinary';

export type VoiceStyle = 
  | 'Friendly & Casual' 
  | 'Professional & Detailed' 
  | 'Enthusiastic & Energetic';

export interface TimeAllocation {
  introduction: number;
  architecture: number;
  history: number;
  culture: number;
  culinary: number;
  conclusion: number;
}

export interface WordBudget {
  totalWords: number;
  wordsPerMinute: number;
  sectionWords: Record<string, number>;
}

export interface Waypoint {
  id: string;
  name: string;
  category: InterestCategory | 'Overview' | 'Wrap-up';
  description: string;
  latitude?: number;
  longitude?: number;
  stepNumber: number;
}

export interface TourSection {
  id: string;
  title: string;
  category: InterestCategory | 'Introduction' | 'Conclusion';
  agentName: string;
  durationMinutes: number;
  wordCount: number;
  content: string;
  paragraphs: string[];
  keyHighlights: string[];
}

export interface Tour {
  id: string;
  title: string;
  location: string;
  summary: string;
  durationMinutes: number;
  interests: InterestCategory[];
  voiceStyle: VoiceStyle;
  sections: TourSection[];
  waypoints: Waypoint[];
  fullScript: string;
  createdAt: string;
  userId?: string;
  audioGenerated?: boolean;
  audioDurationSeconds?: number;
  estimatedListeningTime?: string;
}

export interface AgentStepStatus {
  id: string;
  name: string;
  role: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  message: string;
  timestamp: number;
  outputPreview?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  savedTourIds: string[];
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
