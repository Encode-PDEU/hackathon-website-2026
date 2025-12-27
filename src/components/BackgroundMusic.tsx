import { useEffect, useRef, useState } from 'react';

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = () => {
      audio.volume = 0.3; // 30% volume for background music
      audio.loop = true;
      audio.play().catch(() => {
        // Autoplay blocked by browser
      });
    };

    if (hasInteracted) {
      playAudio();
    } else {
      // Try to play immediately (some browsers allow it)
      playAudio();
      
      // Listen for first user interaction
      const handleUserInteraction = () => {
        playAudio();
        setHasInteracted(true);
        // Remove listener after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };

      document.addEventListener('click', handleUserInteraction, { once: true });
      document.addEventListener('touchstart', handleUserInteraction, { once: true });
      document.addEventListener('keydown', handleUserInteraction, { once: true });

      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
    }
  }, [hasInteracted]);

  return (
    <audio
      ref={audioRef}
      src="/minecraft.mp3"
      loop
      preload="auto"
      crossOrigin="anonymous"
    />
  );
}

export default BackgroundMusic;
