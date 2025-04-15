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
      // Updated paths to match the new location in dist/assets/sounds
      const audio = new Audio(
        type === 'spin'
          ? '/assets/sounds/spin.mp3'  // Updated path for production build
          : '/assets/sounds/result.mp3'  // Updated path for production build
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
