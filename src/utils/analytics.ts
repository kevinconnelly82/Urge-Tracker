import { UrgeEntry, AnalyticsData, Location, Emotion, UrgeType, SensationType, SensationLocation } from '../types';
import { differenceInDays, startOfDay } from 'date-fns';

export function calculateAnalytics(entries: UrgeEntry[]): AnalyticsData {
  if (entries.length === 0) {
    return {
      totalEntries: 0,
      currentStreak: 0,
      successRate: 0,
      urgeTypeBreakdown: {} as Record<UrgeType, number>,
      averageIntensity: 0,
      locationBreakdown: {} as Record<Location, number>,
      emotionBreakdown: {} as Record<Emotion, number>,
      timePatterns: {},
      mostCommonTrigger: 'Not enough data',
      sensationTypeBreakdown: {} as Record<SensationType, number>,
      sensationLocationMap: {} as Record<SensationLocation, number>,
    };
  }

  // Sort by timestamp descending
  const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);

  // Calculate current streak
  const currentStreak = calculateStreak(sortedEntries);

  // Calculate success rate
  const processedCount = entries.filter(e => e.actionTaken === 'Processed the urge').length;
  const successRate = (processedCount / entries.length) * 100;

  // Urge type breakdown
  const urgeTypeBreakdown = entries.reduce((acc, entry) => {
    acc[entry.urgeType] = (acc[entry.urgeType] || 0) + 1;
    return acc;
  }, {} as Record<UrgeType, number>);

  // Average intensity
  const totalIntensity = entries.reduce((sum, entry) => sum + entry.intensity, 0);
  const averageIntensity = totalIntensity / entries.length;

  // Location breakdown
  const locationBreakdown = entries.reduce((acc, entry) => {
    acc[entry.location] = (acc[entry.location] || 0) + 1;
    return acc;
  }, {} as Record<Location, number>);

  // Emotion breakdown
  const emotionBreakdown = entries.reduce((acc, entry) => {
    entry.emotions.forEach(emotion => {
      acc[emotion] = (acc[emotion] || 0) + 1;
    });
    return acc;
  }, {} as Record<Emotion, number>);

  // Sensation type breakdown
  const sensationTypeBreakdown = entries.reduce((acc, entry) => {
    entry.physicalSensations.forEach(sensation => {
      acc[sensation.type] = (acc[sensation.type] || 0) + 1;
    });
    return acc;
  }, {} as Record<SensationType, number>);

  // Sensation location map
  const sensationLocationMap = entries.reduce((acc, entry) => {
    entry.physicalSensations.forEach(sensation => {
      acc[sensation.location] = (acc[sensation.location] || 0) + 1;
    });
    return acc;
  }, {} as Record<SensationLocation, number>);

  // Time patterns (by hour)
  const timePatterns = entries.reduce((acc, entry) => {
    const hour = new Date(entry.timestamp).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Most common trigger combination
  const mostCommonTrigger = findMostCommonTrigger(entries);

  return {
    totalEntries: entries.length,
    currentStreak,
    successRate: Math.round(successRate),
    urgeTypeBreakdown,
    averageIntensity: Math.round(averageIntensity * 10) / 10,
    locationBreakdown,
    emotionBreakdown,
    timePatterns,
    mostCommonTrigger,
    sensationTypeBreakdown,
    sensationLocationMap,
  };
}

function calculateStreak(sortedEntries: UrgeEntry[]): number {
  let streak = 0;
  const today = startOfDay(new Date());

  for (const entry of sortedEntries) {
    if (entry.actionTaken === 'Gave in to urge') {
      const entryDate = startOfDay(new Date(entry.timestamp));
      const daysDiff = differenceInDays(today, entryDate);
      return daysDiff;
    }
  }

  // If no "gave in" found, streak is since first entry
  if (sortedEntries.length > 0) {
    const firstEntry = sortedEntries[sortedEntries.length - 1];
    const firstDate = startOfDay(new Date(firstEntry.timestamp));
    return differenceInDays(today, firstDate);
  }

  return streak;
}

function findMostCommonTrigger(entries: UrgeEntry[]): string {
  if (entries.length < 5) return 'Log more entries to see patterns';

  const combinations: Record<string, number> = {};

  entries.forEach(entry => {
    const topEmotion = entry.emotions[0] || 'Unknown';
    const key = `${topEmotion} at ${entry.location}`;
    combinations[key] = (combinations[key] || 0) + 1;
  });

  const sorted = Object.entries(combinations).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] || 'No clear pattern yet';
}
