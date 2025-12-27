import { motion } from 'framer-motion';

/**
 * End portal frame strip with eyes filled and a central void.
 */
export function EndPortal() {
  return (
    <div
      className="relative w-full h-24 md:h-28 overflow-hidden"
      style={{
        backgroundImage: "url('/imgs/blocks/endframe-side.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: '64px 64px',
        imageRendering: 'pixelated',
      }}
    >
      <div className="absolute inset-3 md:inset-5 bg-black" />
      <motion.div
        className="absolute inset-6 md:inset-8"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(120,120,255,0.35) 0%, rgba(0,0,0,0.9) 65%, #000 100%)',
        }}
        animate={{ opacity: [0.4, 0.65, 0.4], scale: [1, 1.01, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
