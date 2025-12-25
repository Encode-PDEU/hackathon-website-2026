import { useEffect, useState } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let current = 0;

        const interval = setInterval(() => {
            // Java-like stepped progress
            current += Math.random() * (current < 85 ? 12 : 4);

            if (current >= 100) {
                current = 100;
                clearInterval(interval);
                setProgress(100);

                gsap.to(".loading-screen", {
                    opacity: 0,
                    duration: 0.6,
                    delay: 0.5,
                    onComplete: onLoadingComplete
                });
            } else {
                setProgress(current);
            }
        }, 80);

        return () => clearInterval(interval);
    }, [onLoadingComplete]);

    return (
        <>
            <style>{`
        .pixel-text {
          font-family: monospace;
          text-shadow: 2px 2px #000;
        }
      `}</style>

            <div className="loading-screen fixed inset-0 z-50 cursor-none">
                {/* ===== Java Edition dirt background (blurred) ===== */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/dirt.jpeg')",
                        backgroundRepeat: "repeat",
                        backgroundSize: "128px 128px",
                        filter: "blur(1px)",
                        transform: "scale(1)"
                    }}
                />

                {/* ===== Dark vignette overlay ===== */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.75)"
                    }}
                />

                {/* ===== UI layer ===== */}
                <div className="relative flex flex-col items-center justify-center h-full">
                    {/* Percentage */}
                    <div className="mb-2 text-white text-sm pixel-text">
                        {Math.floor(progress)}%
                    </div>

                    {/* Loader square */}
                    <div className="relative w-28 h-28 bg-[#9b9b9b] flex items-center justify-center">
                        {/* Green border */}
                        <div className="relative w-20 h-20 border-2 border-[#00ff00] flex items-center justify-center">
                            {/* White loading core */}
                            <div
                                key={Math.floor(progress)}
                                className="bg-white"
                                style={{
                                    width: `${Math.min(100, progress)}%`,
                                    height: `${Math.min(100, progress)}%`,
                                    transition: "width 0.12s steps(4), height 0.12s steps(4)"
                                }}
                            />
                        </div>
                    </div>

                    {/* Status text */}
                    <p className="mt-3 text-gray-400 text-xs pixel-text">
                        Joining server...
                    </p>
                </div>
            </div>
        </>
    );
}
