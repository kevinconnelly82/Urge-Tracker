import { useState, useEffect } from 'react';
import { Plus, BarChart3, History, Info } from 'lucide-react';
import Dashboard from './components/Dashboard';
import EntryHistory from './components/EntryHistory';
import UrgeEntryForm from './components/UrgeEntryForm';
import { UrgeEntry } from './types';
import { getAllEntries } from './utils/db';
import { calculateAnalytics } from './utils/analytics';

type Tab = 'dashboard' | 'history' | 'about';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<UrgeEntry | undefined>();
  const [entries, setEntries] = useState<UrgeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEntries = async () => {
    try {
      const allEntries = await getAllEntries();
      setEntries(allEntries);
    } catch (error) {
      console.error('Failed to load entries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleFormSubmit = () => {
    setShowEntryForm(false);
    setEditingEntry(undefined);
    loadEntries();
  };

  const handleEdit = (entry: UrgeEntry) => {
    setEditingEntry(entry);
    setShowEntryForm(true);
  };

  const analytics = calculateAnalytics(entries);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Urge Tracker</h1>
          <p className="text-sm text-gray-600">Understand your patterns, take control</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {activeTab === 'dashboard' && <Dashboard analytics={analytics} />}
        {activeTab === 'history' && (
          <EntryHistory 
            entries={entries} 
            onEdit={handleEdit}
            onUpdate={loadEntries}
          />
        )}
        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowEntryForm(true)}
        className="fixed bottom-20 right-4 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-colors z-30"
        title="Log new urge"
      >
        <Plus size={28} />
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center py-3 px-4 ${
                activeTab === 'dashboard' ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <BarChart3 size={24} />
              <span className="text-xs mt-1">Stats</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex flex-col items-center py-3 px-4 ${
                activeTab === 'history' ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <History size={24} />
              <span className="text-xs mt-1">History</span>
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex flex-col items-center py-3 px-4 ${
                activeTab === 'about' ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <Info size={24} />
              <span className="text-xs mt-1">About</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Entry Form Modal */}
      {showEntryForm && (
        <UrgeEntryForm
          onClose={() => {
            setShowEntryForm(false);
            setEditingEntry(undefined);
          }}
          onSubmit={handleFormSubmit}
          existingEntry={editingEntry}
        />
      )}
    </div>
  );
}

function AboutPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">About Urge Tracker</h2>
      
      <div className="space-y-3 text-gray-700">
        <p>
          Urge Tracker helps you identify patterns and triggers in your urges through structured 
          data collection and insightful analytics.
        </p>
        
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <h3 className="font-semibold text-indigo-900 mb-2">Privacy & Security</h3>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• All data is stored locally on your device</li>
            <li>• No data is sent to external servers</li>
            <li>• Your information is completely private</li>
            <li>• You can delete all data at any time</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">Important Notice</h3>
          <p className="text-sm text-yellow-800">
            This app is a tracking tool and is not a replacement for professional treatment. 
            If you're struggling, please reach out to a healthcare provider or counselor.
          </p>
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-semibold text-gray-900 mb-2">How to Use</h3>
          <ol className="text-sm space-y-2">
            <li>1. Tap the + button to log an urge when it happens</li>
            <li>2. Fill in the details (takes less than 60 seconds)</li>
            <li>3. View your patterns on the Dashboard</li>
            <li>4. Review past entries in History</li>
            <li>5. Track your progress over time</li>
          </ol>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600">
            Version 1.0.0 • Built with privacy in mind
          </p>
        </div>
      </div>
    </div>
  );
}
