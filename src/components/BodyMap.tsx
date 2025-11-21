import { PhysicalSensation } from '../types';

interface Props {
  sensationMap: Record<PhysicalSensation, number>;
}

// Map sensations to body regions (adjusted for new silhouette)
const SENSATION_POSITIONS: Record<PhysicalSensation, { x: number; y: number }> = {
  'Headache': { x: 50, y: 10 },
  'Tension in shoulders/neck': { x: 50, y: 28 },
  'Chest tightness': { x: 50, y: 42 },
  'Racing heart': { x: 48, y: 40 },
  'Stomach discomfort': { x: 50, y: 58 },
  'Sweating': { x: 50, y: 48 },
  'Trembling': { x: 28, y: 48 },
  'Restlessness': { x: 50, y: 85 },
  'Numbness': { x: 72, y: 48 },
  'Other': { x: 50, y: 68 },
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
        {/* Human silhouette SVG */}
        <svg viewBox="0 0 100 120" className="w-full h-auto">
          {/* Head */}
          <ellipse cx="50" cy="10" rx="9" ry="11" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5" />
          
          {/* Neck */}
          <path d="M 45 20 L 45 25 L 55 25 L 55 20" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5" />
          
          {/* Shoulders and upper torso */}
          <ellipse cx="50" cy="35" rx="18" ry="12" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5" />
          
          {/* Chest/torso */}
          <path d="M 35 30 Q 32 45 35 60 L 65 60 Q 68 45 65 30" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5" />
          
          {/* Waist/hips */}
          <path d="M 35 60 Q 33 70 36 75 L 64 75 Q 67 70 65 60" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5" />
          
          {/* Left arm */}
          <path d="M 35 32 Q 28 35 25 45 Q 23 52 25 58" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Right arm */}
          <path d="M 65 32 Q 72 35 75 45 Q 77 52 75 58" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Left leg */}
          <path d="M 40 75 L 38 95 L 38 110 Q 38 112 40 112 Q 42 112 42 110 L 42 95 L 44 75" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5" />
          
          {/* Right leg */}
          <path d="M 56 75 L 58 95 L 58 110 Q 58 112 60 112 Q 62 112 62 110 L 62 95 L 60 75" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5" />
          
          {/* Sensation dots */}
          {Object.entries(sensationMap).map(([sensation, count]) => {
            const pos = SENSATION_POSITIONS[sensation as PhysicalSensation];
            if (!pos) return null;
            
            const size = 2.5 + (count / maxCount) * 4; // Scale from 2.5 to 6.5
            const opacity = 0.7 + (count / maxCount) * 0.3; // Scale from 0.7 to 1
            
            return (
              <g key={sensation}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={size}
                  fill="#ef4444"
                  opacity={opacity}
                  stroke="#dc2626"
                  strokeWidth="0.5"
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
