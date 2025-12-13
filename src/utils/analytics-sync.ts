import { supabase } from './supabase';
import { UrgeEntry } from '../types';

// Anonymized entry structure for cloud storage
interface AnonymousUrgeEntry {
  urge_type: string;
  intensity: number;
  location: string;
  emotions: string[];
  sensation_types: string[];
  sensation_locations: string[];
  action_taken: string;
  timestamp: string;
  hour_of_day: number;
  day_of_week: number;
  user_id?: string;
}

export async function syncEntryToCloud(entry: UrgeEntry): Promise<void> {
  try {
    const date = new Date(entry.timestamp);
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    // Create anonymized version - includes user_id for authenticated users
    const anonymousEntry: AnonymousUrgeEntry = {
      urge_type: entry.urgeType,
      intensity: entry.intensity,
      location: entry.location,
      emotions: entry.emotions,
      sensation_types: entry.physicalSensations.map(s => s.type),
      sensation_locations: entry.physicalSensations.map(s => s.location),
      action_taken: entry.actionTaken,
      timestamp: date.toISOString(),
      hour_of_day: date.getHours(),
      day_of_week: date.getDay(),
      user_id: user?.id, // Include user_id for authenticated users
    };

    console.log('Syncing to Supabase:', anonymousEntry);

    const { data, error } = await supabase
      .from('urge_entries')
      .insert([anonymousEntry]);

    if (error) {
      console.error('Failed to sync to cloud:', error);
      // Don't throw - we don't want to block the user if cloud sync fails
    } else {
      console.log('Successfully synced to cloud:', data);
    }
  } catch (error) {
    console.error('Error syncing to cloud:', error);
    // Silently fail - local storage is primary
  }
}
