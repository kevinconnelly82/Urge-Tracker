import { useState, useEffect } from 'react';
import { Plus, BarChart3, History, Info, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import EntryHistory from './EntryHistory';
import UrgeEntryForm from './UrgeEntryForm';
import TermsOfService from './TermsOfService';
import AudioPlayer from './AudioPlayer';
import { useAuth } from '../hooks/useAuth';
import { UrgeEntry } from '../types';
import { getAllEntries } from '../utils/db';
import { calculateAnalytics } from '../utils/analytics';
import ProfileView from './ProfileView';

type Tab = 'dashboard' | 'history' | 'process' | 'about' | 'terms';

export default function DashboardPage() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
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

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  const analytics = calculateAnalytics(entries);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Urge Tracker</h1>
              <p className="text-sm text-gray-600">Understand your patterns, take control</p>
            </div>
            {user && <ProfileView user={user} signOut={handleSignOut} />}
          </div>
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
        {activeTab === 'process' && (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Urge Breath Session</h2>
              <p className="text-gray-600">A guided breathing session to help you work through difficult moments and urges.</p>
            </div>
            
            {/* Audio Player with Fallback */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <div className="text-center space-y-4">
                <div className="bg-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM16 8a2 2 0 11-4 0 2 2 0 014 0zM14 10.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <h3 className="font-semibold text-indigo-900">Listen to Your Guided Session</h3>
                
                <a 
                  href="https://www.dropbox.com/scl/fi/3e0i3v0vp4iysmg8wqj2n/breath-urge-guided.mp3?rlkey=mvp74cfsezi3q2gxwwhdfbpno&st=snx8inhu&dl=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  🎧 Play Audio Session
                </a>
                
                <p className="text-sm text-indigo-700">
                  Opens in a new tab for the best audio experience
                </p>
              </div>
            </div>

            {/* Breathing Exercise Alternative */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3">Quick Breathing Exercise</h3>
              <div className="space-y-2 text-sm text-green-800">
                <p><strong>4-7-8 Technique:</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Inhale quietly through your nose for 4 counts</li>
                  <li>Hold your breath for 7 counts</li>
                  <li>Exhale completely through your mouth for 8 counts</li>
                  <li>Repeat this cycle 3-4 times</li>
                </ol>
                <p className="mt-2 italic">This technique can help calm your nervous system and reduce urge intensity.</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">How to Use</h3>
              <p className="text-sm text-yellow-800">
                Find a quiet, comfortable space. Use headphones if possible. Follow along with the guided audio or practice the breathing technique above when you feel an urge coming on.
              </p>
            </div>
          </div>
        )}
        {activeTab === 'about' && <AboutPage onNavigateToTerms={() => setActiveTab('terms')} />}
        {activeTab === 'terms' && <TermsOfService />}
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
              onClick={() => setActiveTab('process')}
              className={`flex flex-col items-center py-3 px-4 ${
                activeTab === 'process' ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <Headphones size={24} />
              <span className="text-xs mt-1">Process</span>
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

function AboutPage({ onNavigateToTerms }: { onNavigateToTerms?: () => void }) {
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
          <p className="text-sm text-gray-600 mb-2">
            Version 1.0.0 • Built with privacy in mind
          </p>
          {onNavigateToTerms && (
            <button
              onClick={onNavigateToTerms}
              className="text-sm text-indigo-600 hover:text-indigo-800 underline"
            >
              View Terms of Service
            </button>
          )}
        </div>
      </div>
    </div>
  );
}