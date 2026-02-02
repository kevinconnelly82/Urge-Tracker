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
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-8 left-4 right-4 flex justify-between">
          <button
            onClick={onComplete}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Get Started
          </button>
          <button
            onClick={onComplete}
            className="text-blue-600 px-4 py-3 font-semibold underline"
          >
            Log In
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-1 relative">
        <img 
          src={splashDesktop} 
          alt="Urge Tracker" 
          className="w-full h-full object-cover"
        />
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
          <button
            onClick={onComplete}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg"
          >
            Get Started
          </button>
          <button
            onClick={onComplete}
            className="text-blue-600 px-4 py-2 font-semibold underline"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}