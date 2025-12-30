import { useEffect, useState } from 'react';

export function PortalDivider() {
    // Generate random particles
    const [particles, setParticles] = useState<Array<{
        left: string;
        duration: string;
        delay: string;
        size: number;
        color: string;
    }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 15 }).map(() => ({
            left: `${Math.random() * 100}%`,
            duration: `${3 + Math.random() * 4}s`,
            delay: `${Math.random() * 2}s`,
            size: Math.random() > 0.6 ? 12 : 8,
            color: Math.random() > 0.5 ? '#FFD700' : '#FDB931',
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="relative w-full h-16 -mt-10 overflow-visible pointer-events-none z-30">
            {/* Dither effect with gradient fade */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(45deg, hsl(var(--background)) 25%, transparent 25%), 
                        linear-gradient(-45deg, hsl(var(--background)) 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, hsl(var(--background)) 75%), 
                        linear-gradient(-45deg, transparent 75%, hsl(var(--background)) 75%)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    maskImage: 'linear-gradient(to bottom, transparent, black)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
                }}
            />
            <style>
                {`
          @keyframes floatUp {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-150px) rotate(90deg); opacity: 0; }
          }
        `}
            </style>



            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute bottom-0"
                    style={{
                        left: p.left,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        animation: `floatUp ${p.duration} infinite linear`,
                        animationDelay: p.delay,
                        opacity: 0,
                    }}
                />
            ))}
        </div>
    );
}
