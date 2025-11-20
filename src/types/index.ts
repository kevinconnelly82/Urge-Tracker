export type Location = 'Home' | 'Work' | 'School' | "Friend's Place" | 'Public Space' | 'Vehicle' | 'Other';

export type Emotion = 'Stressed' | 'Anxious' | 'Bored' | 'Sad' | 'Angry' | 'Lonely' | 'Happy' | 'Excited' | 'Tired' | 'Other';

export type PhysicalSensation = 
  | 'Chest tightness'
  | 'Racing heart'
  | 'Restlessness'
  | 'Tension in shoulders/neck'
  | 'Sweating'
  | 'Trembling'
  | 'Stomach discomfort'
  | 'Headache'
  | 'Numbness'
  | 'Other';

export type ActionTaken = 'Processed the urge' | 'Gave in to urge' | 'Partially gave in';

export interface UrgeEntry {
  id: string;
  timestamp: number;
  location: Location;
  emotions: Emotion[];
  physicalSensations: PhysicalSensation[];
  actionTaken: ActionTaken;
  notes?: string;
}

export interface AnalyticsData {
  totalEntries: number;
  currentStreak: number;
  successRate: number;
  locationBreakdown: Record<Location, number>;
  emotionBreakdown: Record<Emotion, number>;
  timePatterns: Record<number, number>;
  mostCommonTrigger: string;
}
