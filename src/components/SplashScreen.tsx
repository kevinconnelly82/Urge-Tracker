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
        {/* Invisible clickable buttons positioned over your design buttons */}
        <button
          onClick={onComplete}
          className="absolute bg-transparent border-0 cursor-pointer"
          style={{
            bottom: '5%',   
            left: '10%',    
            width: '35%',   
            height: '8%',   
          }}
          aria-label="Get Started"
        />
        <button
          onClick={onComplete}
          className="absolute bg-transparent border-0 cursor-pointer"
          style={{
            bottom: '5%',   
            right: '10%',   
            width: '30%',   
            height: '8%',   
          }}
          aria-label="Log In"
        />
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-1 relative">
        <img 
          src={splashDesktop} 
          alt="Urge Tracker" 
          className="w-full h-full object-cover"
        />
        {/* Invisible clickable buttons positioned over your design buttons */}
        {/* Get Started button - positioned over your blue button */}
        <button
          onClick={onComplete}
          className="absolute bg-transparent border-0 cursor-pointer"
          style={{
            top: '64%',     
            left: '8%',     
            width: '12%',   
            height: '7%',   
          }}
          aria-label="Get Started"
        />
        {/* Log In button - positioned over your "Log In" text */}
        <button
          onClick={onComplete}
          className="absolute bg-transparent border-0 cursor-pointer"
          style={{
            top: '66%',     
            left: '19%',    
            width: '8%',    
            height: '4%',   
          }}
          aria-label="Log In"
        />
      </div>
    </div>
  );
}