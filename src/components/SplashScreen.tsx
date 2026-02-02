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
        {/* Invisible buttons positioned over your design buttons */}
        <button
          onClick={onComplete}
          className="absolute bg-transparent border-0 cursor-pointer"
          style={{
            bottom: '8%',   // Higher up to avoid being cut off
            left: '15%',    
            width: '30%',   
            height: '6%',   
          }}
          aria-label="Get Started"
        />
        <button
          onClick={onComplete}
          className="absolute bg-transparent border-0 cursor-pointer"
          style={{
            bottom: '8%',   // Same level as Get Started
            right: '15%',   
            width: '25%',   
            height: '6%',   
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
        {/* Invisible buttons positioned exactly over your design buttons */}
        {/* Get Started button - positioned over your blue button */}
        <button
          onClick={onComplete}
          className="absolute bg-transparent border-0 cursor-pointer"
          style={{
            top: '52%',     // Positioned over your blue "Get Started" button
            left: '6%',     
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
            top: '61%',     // Positioned over your "Log In" text
            left: '6%',     
            width: '8%',    
            height: '4%',   
          }}
          aria-label="Log In"
        />
      </div>
    </div>
  );
}