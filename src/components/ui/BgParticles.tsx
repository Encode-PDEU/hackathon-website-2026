import { motion } from "framer-motion";

interface BgParticlesProps {
    variant?: "grass" | "stone" | "space" | "fire" | "water" | "diamond";
    count?: number;
}

const colors = {
    grass: "bg-mc-grass",
    stone: "bg-gray-500",
    space: "bg-purple-400",
    fire: "bg-orange-500",
    water: "bg-blue-400",
    diamond: "bg-mc-diamond"
};

export const BgParticles = ({ variant = "space", count = 20 }: BgParticlesProps) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(count)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${colors[variant]} opacity-20`}
                    style={{
                        width: Math.random() * 8 + 4,
                        height: Math.random() * 8 + 4,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.5, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};
