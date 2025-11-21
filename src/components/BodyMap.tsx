import { PhysicalSensation } from '../types';

interface Props {
  sensationMap: Record<PhysicalSensation, number>;
}

// Map sensations to body regions
const SENSATION_POSITIONS: Record<PhysicalSensation, { x: number; y: number }> = {
  'Headache': { x: 50, y: 15 },
  'Tension in shoulders/neck': { x: 50, y: 38 },
  'Chest tightness': { x: 50, y: 55 },
  'Racing heart': { x: 48, y: 52 },
  'Stomach discomfort': { x: 50, y: 80 },
  'Sweating': { x: 50, y: 65 },
  'Trembling': { x: 22, y: 60 },
  'Restlessness': { x: 50, y: 140 },
  'Numbness': { x: 78, y: 60 },
  'Other': { x: 50, y: 100 },
};

export default function BodyMap({ sensationMap }: Props) {
  const maxCount = Math.max(...Object.values(sensationMap), 1);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Sensation Map</h3>
      <p className="text-sm text-gray-600 mb-4">
        Dots show where you experience physical sensations. Larger dots = more frequent.
      </p>
      
      <div className="relative mx-auto bg-gray-50 rounded-lg p-6" style={{ maxWidth: '300px' }}>
        {/* Simple but clear body diagram */}
        <svg viewBox="0 0 100 200" className="w-full h-auto">
          {/* Head */}
          <circle cx="50" cy="15" r="12" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" />
          
          {/* Neck */}
          <rect x="46" y="27" width="8" height="8" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" rx="2" />
          
          {/* Shoulders */}
          <ellipse cx="50" cy="42" rx="22" ry="8" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" />
          
          {/* Upper torso */}
          <rect x="32" y="38" width="36" height="30" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" rx="4" />
          
          {/* Lower torso */}
          <path d="M 32 68 L 30 95 L 70 95 L 68 68 Z" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" />
          
          {/* Left arm */}
          <rect x="18" y="42" width="8" height="35" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" rx="4" />
          
          {/* Right arm */}
          <rect x="74" y="42" width="8" height="35" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" rx="4" />
          
          {/* Left leg */}
          <rect x="35" y="95" width="10" height="85" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" rx="5" />
          
          {/* Right leg */}
          <rect x="55" y="95" width="10" height="85" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" rx="5" />
          
          {/* Sensation dots with labels */}
          {Object.entries(sensationMap).map(([sensation, count]) => {
            const pos = SENSATION_POSITIONS[sensation as PhysicalSensation];
            if (!pos) return null;
            
            const size = 3 + (count / maxCount) * 5; // Scale from 3 to 8
            const opacity = 0.8 + (count / maxCount) * 0.2; // Scale from 0.8 to 1
            
            return (
              <g key={sensation}>
                {/* Glow effect */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={size + 2}
                  fill="#ef4444"
                  opacity={0.3}
                />
                {/* Main dot */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={size}
                  fill="#ef4444"
                  opacity={opacity}
                  stroke="#dc2626"
                  strokeWidth="1"
                />
                <title>{sensation}: {count} times</title>
              </g>
            );
          })}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="mt-4 text-xs text-gray-600">
        <p className="font-medium mb-2">Most common sensations:</p>
        <ul className="space-y-1">
          {Object.entries(sensationMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([sensation, count]) => (
              <li key={sensation} className="flex justify-between">
                <span>{sensation}</span>
                <span className="font-medium">{count}x</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
