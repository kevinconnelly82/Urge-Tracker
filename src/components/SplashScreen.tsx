import splashDesktop from '../assets/Splash-desktop.png';
import splashMobile from '../assets/Splash-mobile.png';

interface Props {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Mobile View */}
      <div className="md:hidden relative min-h-screen">
        <img 
          src={splashMobile} 
          alt="Urge Tracker" 
          className="w-full h-auto"
        />
        {/* Visible buttons for positioning - will make invisible once positioned correctly */}
        <button
          onClick={onComplete}
          className="absolute bg-red-500 border-2 border-yellow-400 cursor-pointer text-white font-bold"
          style={{
            bottom: '5%',   // Back to bottom since we can now scroll
            left: '10%',    
            width: '35%',   
            height: '8%',   
          }}
        >
          GET STARTED
        </button>
        <button
          onClick={onComplete}
          className="absolute bg-blue-500 border-2 border-yellow-400 cursor-pointer text-white font-bold"
          style={{
            bottom: '5%',   // Same level as Get Started
            right: '10%',   
            width: '30%',   
            height: '8%',   
          }}
        >
          LOG IN
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-1 relative">
        <img 
          src={splashDesktop} 
          alt="Urge Tracker" 
          className="w-full h-full object-cover"
        />
        {/* Visible buttons for positioning - will make invisible once positioned correctly */}
        {/* Get Started button - positioned over your blue button */}
        <button
          onClick={onComplete}
          className="absolute bg-red-500 border-2 border-yellow-400 cursor-pointer text-white font-bold"
          style={{
            top: '64%',     // Down 2% more from 62%
            left: '8%',     // Keep same position
            width: '12%',   
            height: '7%',   
          }}
        >
          GET STARTED
        </button>
        {/* Log In button - positioned over your "Log In" text */}
        <button
          onClick={onComplete}
          className="absolute bg-blue-500 border-2 border-yellow-400 cursor-pointer text-white font-bold"
          style={{
            top: '66%',     // Down 1% from 65%
            left: '19%',    // Right 3% from 16%
            width: '8%',    
            height: '4%',   
          }}
        >
          LOG IN
        </button>
      </div>
    </div>
  );
}