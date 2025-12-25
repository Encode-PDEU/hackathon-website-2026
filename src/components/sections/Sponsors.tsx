import { motion } from "framer-motion";
import { BgParticles } from "../ui/BgParticles";
import traderImg from "../../assets/trader.png";

const SPONSORS = [
    { name: "Tech Corp", tier: "Diamond", color: "bg-cyan-200" },
    { name: "Cloud Sys", tier: "Gold", color: "bg-yellow-200" },
    { name: "Dev Tools", tier: "Gold", color: "bg-yellow-200" },
    { name: "Energy Drink", tier: "Iron", color: "bg-gray-300" },
    { name: "Keyboard Co", tier: "Iron", color: "bg-gray-300" },
    { name: "VPN Service", tier: "Iron", color: "bg-gray-300" },
];

export const Sponsors = () => {
    return (
        <section
            id="sponsors"
            className="py-24 px-6 bg-mc-dirt relative overflow-hidden"
        >
            <BgParticles variant="grass" count={15} />

            <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="font-pixel text-4xl text-center text-white mb-4">
                    VILLAGE MARKET
                </h2>

                <p className="text-center text-white/60 mb-16 font-body">
                    Trade with our generous sponsors.
                </p>

                <div className="flex flex-col lg:flex-row items-end gap-12">
                    {/* Trader */}
                    <div className="hidden lg:flex justify-center w-1/3">
                        <motion.img
                            src={traderImg}
                            alt="Village Trader"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="w-56 image-rendering-pixelated"
                        />
                    </div>

                    {/* Sponsor Stalls */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                        {SPONSORS.map((sponsor, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="bg-[#C6C6C6] border-4 border-black p-4 shadow-[4px_4px_0_rgba(0,0,0,0.5)] flex items-center gap-4 relative">
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
                                        <span className="text-xs bg-yellow-600 text-white px-2 py-0.5 rounded font-mono uppercase">
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
