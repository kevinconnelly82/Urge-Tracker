import { useState, FormEvent } from 'react';
import { UrgeEntry, Location, Emotion, PhysicalSensation, ActionTaken, UrgeType, SensationType, SensationLocation } from '../types';
import { addEntry, updateEntry } from '../utils/db';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  existingEntry?: UrgeEntry;
}

const URGE_TYPES: UrgeType[] = ['Alcohol', 'Cannabis', 'Food', 'Phone', 'Porn', 'Shopping', 'Tobacco', 'TV', 'Vape'];
const LOCATIONS: Location[] = ['Home', 'Work', 'School', "Friend's Place", 'Public Space', 'Vehicle', 'Other'];
const EMOTIONS: Emotion[] = ['Stressed', 'Anxious', 'Bored', 'Sad', 'Angry', 'Lonely', 'Happy', 'Excited', 'Tired', 'Other'];
const SENSATION_TYPES: SensationType[] = [
  'Tightness', 'Restlessness', 'Emptiness', 'Racing/Pounding', 'Tension',
  'Heaviness', 'Sweating', 'Trembling/Shaking', 'Nausea', 'Aching'
];
const SENSATION_LOCATIONS: SensationLocation[] = [
  'Chest', 'Heart', 'Shoulders', 'Neck', 'Stomach', 'Ribs',
  'Face', 'Hips', 'Legs', 'Arms', 'Back'
];
const ACTIONS: ActionTaken[] = ['Processed the urge', 'Gave in to urge', 'Partially gave in'];

export default function UrgeEntryForm({ onClose, onSubmit, existingEntry }: Props) {
  const [timestamp, setTimestamp] = useState(
    existingEntry ? new Date(existingEntry.timestamp).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
  );
  const [urgeType, setUrgeType] = useState<UrgeType | ''>(existingEntry?.urgeType || '');
  const [intensity, setIntensity] = useState<number>(existingEntry?.intensity || 5);
  const [location, setLocation] = useState<Location | ''>(existingEntry?.location || '');
  const [emotions, setEmotions] = useState<Emotion[]>(existingEntry?.emotions || []);
  const [sensations, setSensations] = useState<PhysicalSensation[]>(existingEntry?.physicalSensations || []);
  const [sensationType, setSensationType] = useState<SensationType | ''>('');
  const [sensationLocation, setSensationLocation] = useState<SensationLocation | ''>('');
  const [actionTaken, setActionTaken] = useState<ActionTaken | ''>(existingEntry?.actionTaken || '');
  const [notes, setNotes] = useState(existingEntry?.notes || '');
  const [hasChanges, setHasChanges] = useState(false);

  const handleEmotionToggle = (emotion: Emotion) => {
    setHasChanges(true);
    setEmotions(prev =>
      prev.includes(emotion) ? prev.filter(e => e !== emotion) : [...prev, emotion]
    );
  };

  const handleAddSensation = () => {
    if (!sensationType || !sensationLocation) {
      alert('Please select both a sensation type and location');
      return;
    }
    
    const newSensation: PhysicalSensation = {
      type: sensationType,
      location: sensationLocation
    };
    
    // Check if this combination already exists
    const exists = sensations.some(s => s.type === sensationType && s.location === sensationLocation);
    if (exists) {
      alert('This sensation combination is already added');
      return;
    }
    
    setHasChanges(true);
    setSensations(prev => [...prev, newSensation]);
    setSensationType('');
    setSensationLocation('');
  };

  const handleRemoveSensation = (index: number) => {
    setHasChanges(true);
    setSensations(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!urgeType || !location || emotions.length === 0 || sensations.length === 0 || !actionTaken) {
      alert('Please fill in all required fields');
      return;
    }

    const entry: UrgeEntry = {
      id: existingEntry?.id || `${Date.now()}-${Math.random()}`,
      timestamp: new Date(timestamp).getTime(),
      urgeType,
      intensity,
      location,
      emotions,
      physicalSensations: sensations,
      actionTaken,
      notes: notes.trim() || undefined,
    };

    try {
      if (existingEntry) {
        await updateEntry(entry);
      } else {
        await addEntry(entry);
      }
      onSubmit();
    } catch (error) {
      console.error('Failed to save entry:', error);
      alert('Failed to save entry. Please try again.');
    }
  };

  const handleClose = () => {
    if (hasChanges || existingEntry) {
      if (confirm('Are you sure you want to close without saving?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {existingEntry ? 'Edit Entry' : 'Log Urge'}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Date/Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date & Time *
            </label>
            <input
              type="datetime-local"
              value={timestamp}
              onChange={(e) => { setTimestamp(e.target.value); setHasChanges(true); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Type of Urge */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Urge *
            </label>
            <select
              value={urgeType}
              onChange={(e) => { setUrgeType(e.target.value as UrgeType); setHasChanges(true); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="">Select urge type...</option>
              {URGE_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Intensity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intensity * ({intensity}/10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => { setIntensity(Number(e.target.value)); setHasChanges(true); }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 (Mild)</span>
              <span>5 (Moderate)</span>
              <span>10 (Intense)</span>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <select
              value={location}
              onChange={(e) => { setLocation(e.target.value as Location); setHasChanges(true); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="">Select location...</option>
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Emotions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emotional State * (select all that apply)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {EMOTIONS.map(emotion => (
                <button
                  key={emotion}
                  type="button"
                  onClick={() => handleEmotionToggle(emotion)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    emotions.includes(emotion)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          {/* Physical Sensations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Physical Sensations *
            </label>
            
            <div className="space-y-3">
              {/* Add new sensation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Type of Sensation</label>
                  <select
                    value={sensationType}
                    onChange={(e) => setSensationType(e.target.value as SensationType)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select type...</option>
                    {SENSATION_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Location</label>
                  <select
                    value={sensationLocation}
                    onChange={(e) => setSensationLocation(e.target.value as SensationLocation)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select location...</option>
                    {SENSATION_LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleAddSensation}
                className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium transition-colors"
              >
                + Add Sensation
              </button>
              
              {/* Display added sensations */}
              {sensations.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">Added sensations:</p>
                  <div className="space-y-1">
                    {sensations.map((sensation, index) => (
                      <div key={index} className="flex items-center justify-between bg-indigo-50 px-3 py-2 rounded-md">
                        <span className="text-sm text-indigo-900">
                          {sensation.type} in {sensation.location}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSensation(index)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Taken */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action Taken *
            </label>
            <div className="space-y-2">
              {ACTIONS.map(action => (
                <label key={action} className="flex items-center">
                  <input
                    type="radio"
                    name="action"
                    value={action}
                    checked={actionTaken === action}
                    onChange={(e) => { setActionTaken(e.target.value as ActionTaken); setHasChanges(true); }}
                    className="mr-2"
                    required
                  />
                  <span className="text-sm text-gray-700">{action}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => { setNotes(e.target.value); setHasChanges(true); }}
              maxLength={500}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Any additional context..."
            />
            <p className="text-xs text-gray-500 mt-1">{notes.length}/500 characters</p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 font-medium transition-colors"
            >
              {existingEntry ? 'Update Entry' : 'Save Entry'}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
