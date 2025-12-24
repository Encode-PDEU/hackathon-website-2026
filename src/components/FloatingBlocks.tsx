import { motion } from 'framer-motion';
import { PixelBlock } from './PixelBlock';

const blocks = [
  { type: 'grass' as const, x: '10%', y: '20%', size: 40, delay: 0 },
  { type: 'dirt' as const, x: '85%', y: '30%', size: 32, delay: 0.5 },
  { type: 'stone' as const, x: '15%', y: '70%', size: 36, delay: 1 },
  { type: 'diamond' as const, x: '80%', y: '60%', size: 28, delay: 1.5 },
  { type: 'gold' as const, x: '5%', y: '45%', size: 24, delay: 2 },
  { type: 'grass' as const, x: '90%', y: '80%', size: 44, delay: 0.3 },
  { type: 'stone' as const, x: '70%', y: '15%', size: 30, delay: 0.8 },
  { type: 'dirt' as const, x: '25%', y: '85%', size: 38, delay: 1.2 },
];

export function FloatingBlocks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {blocks.map((block, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: block.x, top: block.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.4, 0.7, 0.4],
            scale: 1,
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            delay: block.delay,
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <PixelBlock type={block.type} size={block.size} />
        </motion.div>
      ))}
    </div>
  );
}
