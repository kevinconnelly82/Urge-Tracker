import { PhysicalSensation } from '../types';

interface Props {
  sensationMap: Record<PhysicalSensation, number>;
}

// Map sensations to body regions
const SENSATION_POSITIONS: Record<PhysicalSensation, { x: number; y: number }> = {
  'Headache': { x: 50, y: 8 },
  'Tension in shoulders/neck': { x: 50, y: 20 },
  'Chest tightness': { x: 50, y: 35 },
  'Racing heart': { x: 50, y: 35 },
  'Stomach discomfort': { x: 50, y: 50 },
  'Sweating': { x: 50, y: 40 },
  'Trembling': { x: 35, y: 55 },
  'Restlessness': { x: 50, y: 70 },
  'Numbness': { x: 65, y: 55 },
  'Other': { x: 50, y: 60 },
};

export default function BodyMap({ sensationMap }: Props) {
  const maxCount = Math.max(...Object.values(sensationMap), 1);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Sensation Map</h3>
      <p className="text-sm text-gray-600 mb-4">
        Dots show where you experience physical sensations. Larger dots = more frequent.
      </p>
      
      <div className="relative mx-auto" style={{ maxWidth: '300px' }}>
        {/* Simple body outline SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-auto">
          {/* Head */}
          <ellipse cx="50" cy="8" rx="8" ry="10" fill="none" stroke="#d1d5db" strokeWidth="1.5" />
          
          {/* Neck */}
          <line x1="50" y1="18" x2="50" y2="22" stroke="#d1d5db" strokeWidth="6" />
          
          {/* Shoulders */}
          <line x1="35" y1="22" x2="65" y2="22" stroke="#d1d5db" strokeWidth="6" strokeLinecap="round" />
          
          {/* Torso */}
          <ellipse cx="50" cy="40" rx="15" ry="18" fill="none" stroke="#d1d5db" strokeWidth="1.5" />
          
          {/* Arms */}
          <line x1="35" y1="25" x2="25" y2="50" stroke="#d1d5db" strokeWidth="4" strokeLinecap="round" />
          <line x1="65" y1="25" x2="75" y2="50" stroke="#d1d5db" strokeWidth="4" strokeLinecap="round" />
          
          {/* Legs */}
          <line x1="45" y1="58" x2="42" y2="90" stroke="#d1d5db" strokeWidth="5" strokeLinecap="round" />
          <line x1="55" y1="58" x2="58" y2="90" stroke="#d1d5db" strokeWidth="5" strokeLinecap="round" />
          
          {/* Sensation dots */}
          {Object.entries(sensationMap).map(([sensation, count]) => {
            const pos = SENSATION_POSITIONS[sensation as PhysicalSensation];
            if (!pos) return null;
            
            const size = 2 + (count / maxCount) * 4; // Scale from 2 to 6
            const opacity = 0.6 + (count / maxCount) * 0.4; // Scale from 0.6 to 1
            
            return (
              <g key={sensation}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={size}
                  fill="#ef4444"
                  opacity={opacity}
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
