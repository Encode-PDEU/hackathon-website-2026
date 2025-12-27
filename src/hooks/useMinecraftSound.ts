import { useMemo } from 'react';

/**
 * Simple sound hook for Minecraft UI interactions.
 * Plays /minecraft.mp3 from the public folder.
 */
export function useMinecraftSound(volume: number = 0.6) {
  const audio = useMemo(() => {
    const a = new Audio('/minecraft.mp3');
    a.volume = Math.max(0, Math.min(1, volume));
    a.preload = 'auto';
    return a;
  }, [volume]);

  const play = () => {
    try {
      audio.currentTime = 0;
      void audio.play();
    } catch (e) {
      // ignore playback errors (e.g., autoplay restrictions)
    }
  };

  return { play };
}

export default useMinecraftSound;
