import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { UrgeEntry } from '../types';

interface UrgeTrackerDB extends DBSchema {
  entries: {
    key: string;
    value: UrgeEntry;
    indexes: { 'by-timestamp': number };
  };
}

let dbInstance: IDBPDatabase<UrgeTrackerDB> | null = null;

export async function getDB() {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<UrgeTrackerDB>('urge-tracker-db', 1, {
    upgrade(db) {
      const store = db.createObjectStore('entries', { keyPath: 'id' });
      store.createIndex('by-timestamp', 'timestamp');
    },
  });

  return dbInstance;
}

export async function addEntry(entry: UrgeEntry): Promise<void> {
  const db = await getDB();
  await db.add('entries', entry);
}

export async function updateEntry(entry: UrgeEntry): Promise<void> {
  const db = await getDB();
  await db.put('entries', entry);
}

export async function deleteEntry(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('entries', id);
}

export async function getEntry(id: string): Promise<UrgeEntry | undefined> {
  const db = await getDB();
  return db.get('entries', id);
}

export async function getAllEntries(): Promise<UrgeEntry[]> {
  const db = await getDB();
  return db.getAllFromIndex('entries', 'by-timestamp');
}

export async function getEntriesByDateRange(start: number, end: number): Promise<UrgeEntry[]> {
  const db = await getDB();
  const allEntries = await db.getAllFromIndex('entries', 'by-timestamp');
  return allEntries.filter(entry => entry.timestamp >= start && entry.timestamp <= end);
}
