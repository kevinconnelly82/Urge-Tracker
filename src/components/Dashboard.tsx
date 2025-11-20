import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { AnalyticsData } from '../types';
import { TrendingUp, MapPin, Heart, Target } from 'lucide-react';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  analytics: AnalyticsData;
}

export default function Dashboard({ analytics }: Props) {
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    // Delay chart rendering slightly for better performance
    const timer = setTimeout(() => setShowCharts(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (analytics.totalEntries === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Target className="text-indigo-600" size={40} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Journey</h3>
          <p className="text-gray-600">
            Log your first urge to begin tracking patterns and gaining insights.
          </p>
        </div>
      </div>
    );
  }

  if (analytics.totalEntries < 5) {
    return (
      <div className="space-y-6">
        <QuickStats analytics={analytics} />
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800 font-medium">
            Keep logging! You need at least 5 entries to see detailed patterns.
          </p>
          <p className="text-yellow-700 text-sm mt-1">
            {5 - analytics.totalEntries} more to go
          </p>
        </div>
      </div>
    );
  }

  const locationData = {
    labels: Object.keys(analytics.locationBreakdown),
    datasets: [{
      data: Object.values(analytics.locationBreakdown),
      backgroundColor: [
        '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#6b7280'
      ],
    }]
  };

  const emotionData = {
    labels: Object.keys(analytics.emotionBreakdown).slice(0, 5),
    datasets: [{
      data: Object.values(analytics.emotionBreakdown).slice(0, 5),
      backgroundColor: [
        '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'
      ],
    }]
  };

  const timeData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [{
      label: 'Urges by Hour',
      data: Array.from({ length: 24 }, (_, i) => analytics.timePatterns[i] || 0),
      backgroundColor: '#6366f1',
    }]
  };

  return (
    <div className="space-y-6">
      <QuickStats analytics={analytics} />

      {showCharts && (
        <>
          {/* Location Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-indigo-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Location Patterns</h3>
            </div>
            <div className="max-w-sm mx-auto">
              <Pie data={locationData} options={{ maintainAspectRatio: true }} />
            </div>
          </div>

          {/* Emotion Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="text-indigo-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Top Emotions</h3>
            </div>
            <div className="max-w-sm mx-auto">
              <Pie data={emotionData} options={{ maintainAspectRatio: true }} />
            </div>
          </div>

          {/* Time Patterns */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-indigo-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Time Patterns</h3>
            </div>
            <Bar 
              data={timeData} 
              options={{ 
                maintainAspectRatio: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                  }
                }
              }} 
            />
          </div>

          {/* Most Common Trigger */}
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Most Common Trigger</h3>
            <p className="text-indigo-900 text-xl font-medium">{analytics.mostCommonTrigger}</p>
          </div>
        </>
      )}
    </div>
  );
}

function QuickStats({ analytics }: { analytics: AnalyticsData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-600 mb-1">Total Entries</p>
        <p className="text-3xl font-bold text-gray-900">{analytics.totalEntries}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-600 mb-1">Current Streak</p>
        <p className="text-3xl font-bold text-green-600">{analytics.currentStreak} days</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-600 mb-1">Success Rate</p>
        <p className="text-3xl font-bold text-indigo-600">{analytics.successRate}%</p>
      </div>
    </div>
  );
}
