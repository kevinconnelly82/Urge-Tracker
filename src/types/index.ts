export type UrgeType = 'Alcohol' | 'Cannabis' | 'Food' | 'Phone' | 'Porn' | 'Shopping' | 'Tobacco' | 'TV' | 'Vape';

export type Location = 'Home' | 'Work' | 'School' | "Friend's Place" | 'Public Space' | 'Vehicle' | 'Other';

export type Emotion = 'Stressed' | 'Anxious' | 'Bored' | 'Sad' | 'Angry' | 'Lonely' | 'Happy' | 'Excited' | 'Tired' | 'Other';

export type SensationType = 
  | 'Tightness'
  | 'Restlessness'
  | 'Emptiness'
  | 'Racing/Pounding'
  | 'Tension'
  | 'Heaviness'
  | 'Sweating'
  | 'Trembling/Shaking'
  | 'Nausea'
  | 'Aching';

export type SensationLocation = 
  | 'Chest'
  | 'Heart'
  | 'Shoulders'
  | 'Neck'
  | 'Stomach'
  | 'Ribs'
  | 'Face'
  | 'Hips'
  | 'Legs'
  | 'Arms'
  | 'Back';

export interface PhysicalSensation {
  type: SensationType;
  location: SensationLocation;
}

export type ActionTaken = 'Processed the urge' | 'Gave in to urge' | 'Partially gave in';

export interface UrgeEntry {
  id: string;
  timestamp: number;
  urgeType: UrgeType;
  intensity: number; // 1-10
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
  urgeTypeBreakdown: Record<UrgeType, number>;
  averageIntensity: number;
  locationBreakdown: Record<Location, number>;
  emotionBreakdown: Record<Emotion, number>;
  timePatterns: Record<number, number>;
  mostCommonTrigger: string;
  sensationTypeBreakdown: Record<SensationType, number>;
  sensationLocationMap: Record<SensationLocation, number>;
}
