import { useState, useCallback } from 'react';

type SoundType = 'spin' | 'result';

export function useSound() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = useCallback(() => {
    setIsMuted((prev: boolean) => !prev);
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (isMuted) return;

    try {
      // For Vercel deployments, we can use relative paths from the root
      const audio = new Audio(
        type === 'spin'
          ? './sounds/spin.mp3'  // Relative path for Vercel deployment
          : './sounds/result.mp3'  // Relative path for Vercel deployment
      );
      
      audio.load();
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Audio playback failed:', error);
        });
      }
    } catch (error) {
      console.error('Error creating audio:', error);
    }
  }, [isMuted]);

  return { isMuted, toggleMute, playSound };
}

export default useSound;
