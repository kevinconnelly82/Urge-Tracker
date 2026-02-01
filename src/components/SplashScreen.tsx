import { useEffect } from 'react';
import splashDesktop from '../assets/Splash-desktop.png';
import splashMobile from '../assets/Splash-mobile.png';

interface Props {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  useEffect(() => {
    // Remove the automatic timer since users will click buttons
    // const timer = setTimeout(() => {
    //   onComplete();
    // }, 3000);
    // return () => clearTimeout(timer);
  }, [onComplete]);

  const handleButtonClick = () => {
    onComplete(); // This will take them to the login page
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Mobile Splash Screen */}
      <div className="md:hidden relative h-full">
        <img 
          src={splashMobile} 
          alt="Urge Tracker" 
          className="w-full h-full object-cover"
        />
        {/* Mobile clickable areas - adjust these coordinates based on your button positions */}
        <button
          onClick={handleButtonClick}
          className="absolute bg-transparent border-0 cursor-pointer"
          style={{
            // Adjust these values based on where your "Get Started" button is positioned
            top: '60%',    // Distance from top (adjust as needed)
            left: '20%',   // Distance from left (adjust as needed)
            width: '60%',  // Button width (adjust as needed)
            height: '8%',  // Button height (adjust as needed)
          }}
          aria-label="Get Started"
        />
        <button
          onClick={handleButtonClick}
          className="absolute bg-transparent border-0 cursor-pointer"
          style={{
            // Adjust these values based on where your "Log In" button is positioned
            top: '70%',    // Distance from top (adjust as needed)
            left: '20%',   // Distance from left (adjust as needed)
            width: '60%',  // Button width (adjust as needed)
            height: '8%',  // Button height (adjust as needed)
          }}
          aria-label="Log In"
        />
      </div>
      
      {/* Desktop Splash Screen */}
      <div className="hidden md:block relative h-full">
        <img 
          src={splashDesktop} 
          alt="Urge Tracker" 
          className="w-full h-full object-cover"
        />
        {/* Desktop clickable areas - adjust these coordinates based on your button positions */}
        <button
          onClick={handleButtonClick}
          className="absolute bg-transparent border-0 cursor-pointer"
          style={{
            // Adjust these values based on where your "Get Started" button is positioned
            top: '65%',    // Distance from top (adjust as needed)
            left: '30%',   // Distance from left (adjust as needed)
            width: '40%',  // Button width (adjust as needed)
            height: '6%',  // Button height (adjust as needed)
          }}
          aria-label="Get Started"
        />
        <button
          onClick={handleButtonClick}
          className="absolute bg-transparent border-0 cursor-pointer"
          style={{
            // Adjust these values based on where your "Log In" button is positioned
            top: '73%',    // Distance from top (adjust as needed)
            left: '30%',   // Distance from left (adjust as needed)
            width: '40%',  // Button width (adjust as needed)
            height: '6%',  // Button height (adjust as needed)
          }}
          aria-label="Log In"
        />
      </div>
    </div>
  );
}