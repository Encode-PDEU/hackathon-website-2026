import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface DimensionLayerProps {
  type: 'nether' | 'end';
  children: React.ReactNode;
}

export function DimensionLayer({ type, children }: DimensionLayerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax: background moves slower than foreground
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const bgImage = type === 'nether' ? '/imgs/blocks/netherrack.png' : '/imgs/blocks/end-stone.png';
  const overlayColor = type === 'nether' ? 'bg-red-900/30' : 'bg-black/60';

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y, backgroundImage: `url(${bgImage})` }}
        className="absolute inset-0 z-0 bg-repeat bg-[length:64px_64px] opacity-80"
      />
      {/* Tint Overlay */}
      <div className={`absolute inset-0 z-0 ${overlayColor} pointer-events-none`} />

      {/* Content */}
      <div className="relative z-10 py-20">
        {children}
      </div>
    </section>
  );
}
