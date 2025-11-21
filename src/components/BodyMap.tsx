import { SensationLocation } from '../types';
import bodySilhouette from '../assets/body-silhouette.png';

interface Props {
  sensationMap: Record<SensationLocation, number>;
}

// Map body locations to positions on the silhouette (percentages of image dimensions)
const LOCATION_POSITIONS: Record<SensationLocation, { x: string; y: string }> = {
  'Face': { x: '50%', y: '8%' },
  'Neck': { x: '50%', y: '18%' },
  'Shoulders': { x: '50%', y: '24%' },
  'Chest': { x: '50%', y: '35%' },
  'Heart': { x: '48%', y: '33%' },
  'Ribs': { x: '50%', y: '40%' },
  'Stomach': { x: '50%', y: '48%' },
  'Hips': { x: '50%', y: '55%' },
  'Arms': { x: '25%', y: '42%' },
  'Back': { x: '50%', y: '38%' },
  'Legs': { x: '50%', y: '75%' },
};

export default function BodyMap({ sensationMap }: Props) {
  const maxCount = Math.max(...Object.values(sensationMap), 1);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Body Location Map</h3>
      <p className="text-sm text-gray-600 mb-4">
        Dots show where on your body you experience sensations. Larger dots = more frequent.
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
          {Object.entries(sensationMap).map(([location, count]) => {
            const pos = LOCATION_POSITIONS[location as SensationLocation];
            if (!pos) return null;
            
            const size = 12 + (count / maxCount) * 20; // Scale from 12px to 32px
            const opacity = 0.7 + (count / maxCount) * 0.3; // Scale from 0.7 to 1
            
            return (
              <div
                key={location}
                className="absolute"
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: 'translate(-50%, -50%)',
                }}
                title={`${location}: ${count} times`}
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
        <p className="font-medium mb-2">Most common locations:</p>
        <ul className="space-y-1">
          {Object.entries(sensationMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([location, count]) => (
              <li key={location} className="flex justify-between">
                <span>{location}</span>
                <span className="font-medium">{count}x</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
