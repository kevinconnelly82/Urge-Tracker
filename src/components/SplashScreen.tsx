import { useEffect } from 'react';
import splashImage from '../assets/splash-screen.png';

interface Props {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <img 
        src={splashImage} 
        alt="Urge Tracker" 
        className="w-full h-full object-cover"
      />
    </div>
  );
}