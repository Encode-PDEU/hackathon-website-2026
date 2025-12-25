'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Pixel art hearts and hunger using CSS/SVG can be done here, or emojis for speed/style
const HEART = "❤️";
const HUNGER = "🍖";

export default function HUD() {
    return (
        <div className="fixed inset-0 pointer-events-none z-40 p-4 flex flex-col justify-end pb-24">
            {/* Quest Log Book (Pointer events re-enabled inside component or wrapper) */}
            {/* <div className="pointer-events-auto">
                <QuestBook />
            </div> */}

            {/* Top Left: Hearts? Or Bottom Left? Usually Bottom above hotbar.
                 User said "in the corners". I will put them bottom left and bottom right. 
             */}

            <div className="absolute bottom-5 left-5 flex gap-1">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={`heart-${i}`}
                        className="text-2xl filter drop-shadow-md"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 3 }}
                    >
                        {HEART}
                    </motion.div>
                ))}
            </div>

            <div className="absolute bottom-5 right-5 flex gap-1 transform scale-x-[-1]">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={`hunger-${i}`}
                        className="text-2xl filter drop-shadow-md"
                    >
                        {HUNGER}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}