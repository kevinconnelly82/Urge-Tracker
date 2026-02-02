import splashDesktop from '../assets/Splash-desktop.png';
import splashMobile from '../assets/Splash-mobile.png';

interface Props {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Mobile View */}
      <div className="md:hidden flex-1 relative">
        <img 
          src={splashMobile} 
          alt="Urge Tracker" 
          className="w-full h-full object-contain"
        />
        {/* Visible buttons for positioning - will make invisible once positioned correctly */}
        <button
          onClick={onComplete}
          className="absolute bg-red-500 border-2 border-yellow-400 cursor-pointer text-white font-bold"
          style={{
            bottom: '25%',  // Move higher up on the image
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
            bottom: '25%',  // Same level as Get Started
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
            top: '62%',     // Down another 5% from 57%
            left: '8%',     // Right 2% from 6%
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
            top: '65%',     // Down 2% from 63%
            left: '16%',    // Right 5% from 11%
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