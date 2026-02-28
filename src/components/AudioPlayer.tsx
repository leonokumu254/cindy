import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { CONFIG } from '../constants';
import './AudioPlayer.css';

interface AudioPlayerProps {
  isPlaying: boolean;
}

export default function AudioPlayer({ isPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      // Try to play, handle autoplay restrictions
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="audio-player">
      <audio 
        ref={audioRef} 
        src={CONFIG.assets.bgMusic} 
        loop 
        preload="auto"
      />
      {isPlaying && (
        <button 
          onClick={toggleMute}
          className="mute-button"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}
    </div>
  );
}
