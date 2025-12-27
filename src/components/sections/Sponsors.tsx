import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { BgParticles } from "../ui/BgParticles";
import { VillagerModel } from "../3d/VillagerModel";

const SPONSORS = [
    { name: "Tech Corp", tier: "Diamond", color: "bg-cyan-200" },
    { name: "Cloud Sys", tier: "Gold", color: "bg-yellow-200" },
    { name: "Dev Tools", tier: "Gold", color: "bg-yellow-200" },
    { name: "Energy Drink", tier: "Iron", color: "bg-gray-300" },
    { name: "Keyboard Co", tier: "Iron", color: "bg-gray-300" },
    { name: "VPN Service", tier: "Iron", color: "bg-gray-300" },
];

import { useState } from "react";

export const Sponsors = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        setMousePos({ x, y });
    };

    return (
        <section
            id="sponsors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className="py-24 px-6 relative overflow-hidden
           bg-gradient-to-b
           from-[#2a1f14]
           via-[#1b1f2a]
           to-[#0b1220]
           shadow-[inset_0_40px_80px_rgba(0,0,0,0.6)]"
        >
            <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="font-pixel text-4xl text-center text-white mb-4">
                    VILLAGE MARKET
                </h2>

                <p className="text-center text-white/60 mb-16 font-body">
                    Trade with our generous sponsors.
                </p>

                <div className="flex flex-col lg:flex-row items-end gap-12">
                    {/* Trader */}
                    <div className="hidden lg:flex justify-center w-1/3 h-[500px]">
                        <Canvas shadows camera={{ position: [0, 0, 5], fov: 40 }}>
                            <ambientLight intensity={1.8} />
                            <pointLight position={[10, 10, 10]} intensity={1.5} />
                            <spotLight position={[-5, 5, 5]} intensity={1} />
                            <Stage environment={null} intensity={1} shadows="contact">
                                <VillagerModel isHovered={isHovered} mousePos={mousePos} />
                            </Stage>
                            <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
                        </Canvas>
                    </div>

                    {/* Sponsor Stalls */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                        {SPONSORS.map((sponsor, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                    delay: index * 0.1
                                }}
                                viewport={{ once: true }}
                                className="group cursor-pointer"
                            >
                                <div className="bg-[#B8B8B8]
 border-4 border-black p-4 shadow-[4px_4px_0_rgba(0,0,0,0.5)] flex items-center gap-4 relative">
                                    {/* Trade Arrow */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <span className="text-2xl font-bold">
                                            ➔
                                        </span>
                                    </div>

                                    {/* Left Slot */}
                                    <div className="w-16 h-16 bg-[#8B8B8B] shadow-inner border-b-white border-r-white border-t-[#373737] border-l-[#373737] border-2 p-2 flex items-center justify-center">
                                        <div
                                            className={`w-8 h-8 rounded-full ${sponsor.color} animate-pulse-slow`}
                                        />
                                    </div>

                                    {/* Right Slot */}
                                    <div className="flex-1 pl-8">
                                        <h3 className="font-pixel text-sm text-[#373737] mb-1">
                                            {sponsor.name}
                                        </h3>
                                        <span className="text-xs bg-emerald-600/80 text-emerald-100 px-2 py-0.5 rounded font-mono uppercase">
                                            {sponsor.tier}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
