import { useState, useEffect, useRef } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface ProfileViewProps {
  user: User;
  signOut: () => Promise<void>;
}

export default function ProfileView({ user, signOut }: ProfileViewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get user display name
  const displayName = 
    user.user_metadata?.full_name || 
    user.user_metadata?.username || 
    user.email?.split('@')[0] || 
    'User';

  // Get user email
  const userEmail = user.email || '';

  // Get initials for avatar
  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(displayName);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ '--tw-ring-color': '#3a577e' } as any}
        aria-label="Profile menu"
        aria-expanded={isOpen}
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-medium" style={{ backgroundColor: '#3a577e' }}>
          {initials}
        </div>
        
        {/* Name */}
        <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
          {displayName}
        </span>
        
        {/* Chevron */}
        <ChevronDown 
          size={16} 
          className={`text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* Profile Info Section */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              {/* Large Avatar */}
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-medium flex-shrink-0">
                {initials}
              </div>
              
              {/* Name and Email */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {userEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="px-2 py-2">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
