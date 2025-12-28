import { useState, useEffect, useRef } from 'react';

const JukeBox = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    // Use a ref to keep the audio instance persistent without triggering re-renders
    const audioInstance = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio instance on mount
        try {
            audioInstance.current = new Audio("/minecraft2.mp3");
            audioInstance.current.loop = true;

            // Preload
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
            if (audio) {
                audio.pause();
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('pause', handlePause);
                audio.removeEventListener('play', handlePlay);
                audio.removeEventListener('error', handleError);
            }
        };
    }, []);

    const togglePlay = async () => {
        const audio = audioInstance.current;
        if (!audio) {
            console.error("Audio instance not initialized");
            return;
        }

        if (isPlaying) {
            audio.pause();
        } else {
            try {
                await audio.play();
            } catch (error) {
                console.error("JukeBox playback failed:", error);

                // Detailed error info
                if (error instanceof Error) {
                    console.error("Error name:", error.name);
                    console.error("Error message:", error.message);
                }
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
        bottom-4
        left-1/2
        -translate-x-[340px]
        z-[60]
        cursor-pointer
        transition-transform
        hover:scale-110
        active:scale-95
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
