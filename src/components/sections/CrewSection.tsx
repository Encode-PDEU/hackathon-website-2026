import { motion } from "framer-motion";
// import { Github, Twitter } from "lucide-react";
import { BgParticles } from "../ui/BgParticles";
import alex from "../../assets/Alex.jpg";
import creeper from "../../assets/Creeper.jpg";
import ender from "../../assets/Ender.jpg";
import steve from "../../assets/Steve.jpg";


const CREW = [
    { name: "Alex", role: "Survival Leader", image: alex },
    { name: "Creeper", role: "Demolitions Expert", image: creeper },
    { name: "Ender", role: "Architect / Explorer", image: ender },
    { name: "Steve", role: "Redstone Engineer", image: steve },
];

export const Crew = () => {
    return (
        <section id="crew" className="py-24 px-6 bg-mc-stone relative overflow-hidden">
            <BgParticles variant="water" count={20} />
            <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="font-pixel text-4xl text-center text-white mb-16">Crew</h2>

                <div className="flex flex-wrap justify-center gap-12">
                    {CREW.map((member, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center gap-4 group"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", bounce: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* 3D Head Effect */}
                            <div className="relative w-32 h-32 transform-style-3d group-hover:-translate-y-4 transition-transform duration-300">
                                <div className={`absolute inset-0 bg-white border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,0.5)] overflow-hidden`}>
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover pixelated"
                                    />
                                </div>
                                {/* Name Tag */}
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/70 px-3 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    <span className="font-pixel text-white text-xs">{member.role}</span>
                                </div>
                            </div>

                            <h3 className="font-pixel text-white text-lg">{member.name}</h3>
                            {/* <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                <Github size={16} />
                                <Twitter size={16} />
                            </div> */}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
