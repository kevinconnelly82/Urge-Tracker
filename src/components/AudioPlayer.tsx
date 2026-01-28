import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface Props {
  audioSrc: string;
  title: string;
  description?: string;
}

export default function AudioPlayer({ audioSrc, title, description }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      console.error('Audio src:', audio.src);
      setHasError(true);
    };
    const handleLoadStart = () => console.log('Audio load started');
    const handleCanPlay = () => console.log('Audio can play');

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const restart = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    if (!time || !isFinite(time) || isNaN(time)) {
      return '0:00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
      </div>

      <audio 
        ref={audioRef} 
        src={audioSrc} 
        preload="metadata"
        crossOrigin="anonymous"
        onError={(e) => console.error('Audio loading error:', e)}
        onLoadStart={() => console.log('Audio loading started')}
        onCanPlay={() => console.log('Audio can play')}
      />

      {hasError ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <h3 className="font-semibold text-yellow-900 mb-2">Audio Player Issue</h3>
          <p className="text-sm text-yellow-800 mb-3">
            The audio player is having trouble loading. Try refreshing the page or use the breathing technique below.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-green-900 mb-2">4-7-8 Breathing Technique</h4>
            <p className="text-sm text-green-800">
              Inhale for 4 counts, hold for 7 counts, exhale for 8 counts. Repeat 3-4 times.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Main Controls */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={restart}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Restart"
            >
              <RotateCcw size={20} />
            </button>

            <button
              onClick={togglePlay}
              className="p-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={toggleMute}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500 w-12">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration && isFinite(duration) ? duration : 0}
                value={currentTime && isFinite(currentTime) ? currentTime : 0}
                onChange={handleSeek}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm text-gray-500 w-12">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-center space-x-3">
            <Volume2 size={16} className="text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </>
      )}

      {/* Instructions */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <h3 className="font-semibold text-indigo-900 mb-2">How to Use</h3>
        <p className="text-sm text-indigo-800">
          Find a quiet, comfortable space. Press play and follow along with the guided audio. 
          This can help you process and work through difficult moments.
        </p>
      </div>
    </div>
  );
}