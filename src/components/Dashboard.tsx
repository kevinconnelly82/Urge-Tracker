import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie, Bar } from 'react-chartjs-2';
import { AnalyticsData } from '../types';
import { TrendingUp, MapPin, Heart, Target, Activity } from 'lucide-react';
import BodyMap from './BodyMap';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

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

  const pieOptions = {
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold' as const,
          size: 14,
        },
        formatter: (value: number, context: any) => {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(0);
          return percentage + '%';
        }
      }
    }
  };

  const urgeTypeData = {
    labels: Object.keys(analytics.urgeTypeBreakdown),
    datasets: [{
      data: Object.values(analytics.urgeTypeBreakdown),
      backgroundColor: [
        '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#6b7280', '#f97316', '#14b8a6'
      ],
    }]
  };

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
          {/* Urge Type Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="text-indigo-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Urge Types</h3>
            </div>
            <div className="max-w-sm mx-auto">
              <Pie data={urgeTypeData} options={pieOptions} />
            </div>
          </div>

          {/* Body Map */}
          {Object.keys(analytics.physicalSensationMap).length > 0 && (
            <BodyMap sensationMap={analytics.physicalSensationMap} />
          )}

          {/* Location Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-indigo-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Location Patterns</h3>
            </div>
            <div className="max-w-sm mx-auto">
              <Pie data={locationData} options={pieOptions} />
            </div>
          </div>

          {/* Emotion Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="text-indigo-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Top Emotions</h3>
            </div>
            <div className="max-w-sm mx-auto">
              <Pie data={emotionData} options={pieOptions} />
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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-600 mb-1">Total Entries</p>
        <p className="text-3xl font-bold text-gray-900">{analytics.totalEntries}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-600 mb-1">Avg Intensity</p>
        <p className="text-3xl font-bold text-orange-600">{analytics.averageIntensity}/10</p>
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
