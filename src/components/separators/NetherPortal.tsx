import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMinecraftSound } from '@/hooks/useMinecraftSound';

/**
 * Obsidian strip with animated purple portal tiles.
 * Plays portal trigger sound once when it enters the viewport.
 */
export function NetherPortal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '-20% 0px -20% 0px', once: true });
  const { play } = useMinecraftSound(0.5);

  useEffect(() => {
    if (inView) play();
  }, [inView, play]);

  return (
    <div
      ref={ref}
      className="relative w-full h-24 md:h-28 overflow-hidden"
      style={{
        backgroundImage: "url('/imgs/blocks/obsidian.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: '64px 64px',
        imageRendering: 'pixelated',
      }}
    >
      <motion.div
        className="absolute inset-4 md:inset-6"
        style={{
          backgroundImage: "url('/imgs/blocks/portal.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '64px 64px',
          imageRendering: 'pixelated',
          filter: 'saturate(1.4)'
        }}
        animate={{ opacity: [0.75, 1, 0.85], scale: [1, 1.02, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
