import { PhysicalSensation } from '../types';
import bodySilhouette from '../assets/body-silhouette.png';

interface Props {
  sensationMap: Record<PhysicalSensation, number>;
}

// Map sensations to body regions (percentages of image dimensions)
const SENSATION_POSITIONS: Record<PhysicalSensation, { x: string; y: string }> = {
  'Headache': { x: '50%', y: '8%' },
  'Tension in shoulders/neck': { x: '50%', y: '22%' },
  'Chest tightness': { x: '50%', y: '35%' },
  'Racing heart': { x: '48%', y: '33%' },
  'Stomach discomfort': { x: '50%', y: '48%' },
  'Sweating': { x: '50%', y: '40%' },
  'Trembling': { x: '25%', y: '38%' },
  'Restlessness': { x: '50%', y: '75%' },
  'Numbness': { x: '75%', y: '38%' },
  'Other': { x: '50%', y: '55%' },
};

export default function BodyMap({ sensationMap }: Props) {
  const maxCount = Math.max(...Object.values(sensationMap), 1);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Sensation Map</h3>
      <p className="text-sm text-gray-600 mb-4">
        Dots show where you experience physical sensations. Larger dots = more frequent.
      </p>
      
      <div className="relative mx-auto bg-gray-50 rounded-lg p-6" style={{ maxWidth: '400px' }}>
        {/* Custom body silhouette with sensation dots */}
        <div className="relative">
          <img 
            src={bodySilhouette} 
            alt="Body silhouette" 
            className="w-full h-auto"
          />
          
          {/* Sensation dots overlay */}
          {Object.entries(sensationMap).map(([sensation, count]) => {
            const pos = SENSATION_POSITIONS[sensation as PhysicalSensation];
            if (!pos) return null;
            
            const size = 12 + (count / maxCount) * 20; // Scale from 12px to 32px
            const opacity = 0.7 + (count / maxCount) * 0.3; // Scale from 0.7 to 1
            
            return (
              <div
                key={sensation}
                className="absolute"
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: 'translate(-50%, -50%)',
                }}
                title={`${sensation}: ${count} times`}
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-full bg-red-500"
                  style={{
                    width: `${size + 8}px`,
                    height: `${size + 8}px`,
                    opacity: 0.3,
                    transform: 'translate(-4px, -4px)',
                  }}
                />
                {/* Main dot */}
                <div
                  className="rounded-full bg-red-500 border-2 border-red-700"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity: opacity,
                  }}
                />
              </div>
            );
          })}
        </div>
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
