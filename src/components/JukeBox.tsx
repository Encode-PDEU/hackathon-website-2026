import { useState, useEffect, useRef } from 'react';

const JukeBox = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioInstance = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        try {
            audioInstance.current = new Audio("/minecraft2.mp3");
            audioInstance.current.loop = true;
            audioInstance.current.load();
        } catch (e) {
            console.error("Failed to initialize audio:", e);
        }

        const audio = audioInstance.current;
        if (!audio) return;

        const handleEnded = () => setIsPlaying(false);
        const handlePause = () => setIsPlaying(false);
        const handlePlay = () => setIsPlaying(true);
        const handleError = (e: any) => console.error("Audio error event:", e);

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('error', handleError);

        return () => {
            audio.pause();
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('error', handleError);
        };
    }, []);

    const togglePlay = async () => {
        const audio = audioInstance.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            try {
                await audio.play();
            } catch (error) {
                console.error("JukeBox playback failed:", error);
            }
        }
    };

    return (
        <div
            onClick={togglePlay}
            role="button"
            aria-label="Toggle Music"
            title={isPlaying ? 'Stop Music' : 'Play Music'}
            className="
        fixed
        z-[60]
        transition-transform
        hover:scale-110
        active:scale-95

        /* Mobile: pushed outside viewport to avoid overlap */
        top-16
        right-[-24px]

        /* Laptop & wide screens: original placement */
        sm:top-auto
        sm:right-auto
        sm:bottom-4
        sm:left-1/2
        sm:-translate-x-[340px]
      "
        >
            <img
                src="/JukeBox.png"
                alt="Jukebox"
                draggable={false}
                className={`
          h-14 w-auto
          image-rendering-pixelated
          select-none
          ${isPlaying
                        ? 'drop-shadow-[0_0_12px_rgba(255,200,0,0.85)]'
                        : 'drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]'
                    }
        `}
            />
        </div>
    );
};

export default JukeBox;
