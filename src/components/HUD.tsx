'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HEART = '❤️';
const HUNGER = '🍖';

export default function HUD() {
  const [slots, setSlots] = useState(5);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateHUD = () => {
      const w = window.innerWidth;

      if (w < 400) {
        setSlots(4);          // 📱 small mobile
        setIsDesktop(false);
      } else if (w < 768) {
        setSlots(5);          // 📱 mobile / tablet
        setIsDesktop(false);
      } else {
        setSlots(10);         // 💻 laptop / desktop
        setIsDesktop(true);
      }
    };

    updateHUD();
    window.addEventListener('resize', updateHUD);
    return () => window.removeEventListener('resize', updateHUD);
  }, []);

  return (
    <div
      className={`
        fixed left-0 right-0 z-40 pointer-events-none
        flex items-end
        px-[clamp(0.75rem,3vw,1.5rem)]
        ${isDesktop
          ? 'bottom-0 pb-[2rem]'   // 💻 DOWN with hotbar
          : 'bottom-0 pb-[7.5rem]'   // 📱 ABOVE hotbar
        }
      `}
    >
      {/* ❤️ LEFT: Health */}
      <div className="flex flex-1 justify-start">
        <div className="flex gap-[clamp(0.25rem,1vw,0.45rem)]">
          {[...Array(slots)].map((_, i) => (
            <motion.span
              key={`heart-${i}`}
              className="
                select-none
                drop-shadow-md
                text-[clamp(1rem,4vw,1.4rem)]
              "
              animate={{ scale: [1, 1.15, 1] }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              {HEART}
            </motion.span>
          ))}
        </div>
      </div>

      {/* 🛣️ CENTER GAP */}
      <div
        className="
          flex-shrink-0
          w-[clamp(2.5rem,8vw,6rem)]
        "
      />

      {/* 🍖 RIGHT: Hunger */}
      <div className="flex flex-1 justify-end">
        <div className="flex gap-[clamp(0.25rem,1vw,0.45rem)] scale-x-[-1]">
          {[...Array(slots)].map((_, i) => (
            <span
              key={`hunger-${i}`}
              className="
                select-none
                drop-shadow-md
                text-[clamp(1rem,4vw,1.4rem)]
              "
            >
              {HUNGER}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
