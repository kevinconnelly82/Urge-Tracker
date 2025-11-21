import { useState } from 'react';
import { UrgeEntry, Location, Emotion, ActionTaken } from '../types';
import { format } from 'date-fns';
import { Trash2, Edit, Search, Filter } from 'lucide-react';
import { deleteEntry } from '../utils/db';

interface Props {
  entries: UrgeEntry[];
  onEdit: (entry: UrgeEntry) => void;
  onUpdate: () => void;
}

export default function EntryHistory({ entries, onEdit, onUpdate }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState<Location | ''>('');
  const [filterEmotion, setFilterEmotion] = useState<Emotion | ''>('');
  const [filterAction, setFilterAction] = useState<ActionTaken | ''>('');
  const [showFilters, setShowFilters] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteEntry(id);
        onUpdate();
      } catch (error) {
        console.error('Failed to delete entry:', error);
        alert('Failed to delete entry. Please try again.');
      }
    }
  };

  // Filter entries
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = !searchTerm || 
      (entry.notes?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = !filterLocation || entry.location === filterLocation;
    const matchesEmotion = !filterEmotion || entry.emotions.includes(filterEmotion);
    const matchesAction = !filterAction || entry.actionTaken === filterAction;

    return matchesSearch && matchesLocation && matchesEmotion && matchesAction;
  });

  // Sort by timestamp descending
  const sortedEntries = [...filteredEntries].sort((a, b) => b.timestamp - a.timestamp);

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-gray-600">No entries yet. Start logging to see your history.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              showFilters ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Filter size={20} />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t">
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value as Location | '')}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All Locations</option>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="School">School</option>
              <option value="Friend's Place">Friend's Place</option>
              <option value="Public Space">Public Space</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={filterEmotion}
              onChange={(e) => setFilterEmotion(e.target.value as Emotion | '')}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All Emotions</option>
              <option value="Stressed">Stressed</option>
              <option value="Anxious">Anxious</option>
              <option value="Bored">Bored</option>
              <option value="Sad">Sad</option>
              <option value="Angry">Angry</option>
              <option value="Lonely">Lonely</option>
              <option value="Happy">Happy</option>
              <option value="Excited">Excited</option>
              <option value="Tired">Tired</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value as ActionTaken | '')}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All Actions</option>
              <option value="Processed the urge">Processed</option>
              <option value="Gave in to urge">Gave in</option>
              <option value="Partially gave in">Partially gave in</option>
            </select>
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-600 px-1">
        Showing {sortedEntries.length} of {entries.length} entries
      </p>

      {/* Entry List */}
      <div className="space-y-3">
        {sortedEntries.map(entry => (
          <div key={entry.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-gray-900">
                  {format(new Date(entry.timestamp), 'MMM d, yyyy')}
                </p>
                <p className="text-sm text-gray-600">
                  {format(new Date(entry.timestamp), 'h:mm a')}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(entry)}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                  title="Edit entry"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete entry"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Type:</span>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                  {entry.urgeType}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Intensity:</span>
                <span className="text-gray-600">{entry.intensity}/10</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Location:</span>
                <span className="text-gray-600">{entry.location}</span>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <span className="font-medium text-gray-700">Emotions:</span>
                <div className="flex flex-wrap gap-1">
                  {entry.emotions.map(emotion => (
                    <span key={emotion} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs">
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Action:</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  entry.actionTaken === 'Processed the urge' 
                    ? 'bg-green-100 text-green-700'
                    : entry.actionTaken === 'Gave in to urge'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {entry.actionTaken}
                </span>
              </div>

              {entry.notes && (
                <div className="text-sm mt-2 pt-2 border-t">
                  <p className="text-gray-700">{entry.notes}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {sortedEntries.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No entries match your filters.
        </div>
      )}
    </div>
  );
}
