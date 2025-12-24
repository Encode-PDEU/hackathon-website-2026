import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PixelBlockProps {
  type: 'grass' | 'dirt' | 'stone' | 'diamond' | 'gold' | 'redstone';
  size?: number;
  className?: string;
  animate?: boolean;
}

const blockColors = {
  grass: 'bg-primary',
  dirt: 'bg-secondary',
  stone: 'bg-muted',
  diamond: 'bg-accent',
  gold: 'bg-gold',
  redstone: 'bg-destructive',
};

export function PixelBlock({ type, size = 48, className, animate = false }: PixelBlockProps) {
  const BlockComponent = animate ? motion.div : 'div';
  
  return (
    <BlockComponent
      className={cn(
        'relative pixel-border',
        blockColors[type],
        className
      )}
      style={{ width: size, height: size }}
      {...(animate && {
        initial: { scale: 0, rotate: -10 },
        animate: { scale: 1, rotate: 0 },
        transition: { type: 'spring', stiffness: 300, damping: 15 },
      })}
    >
      {/* Texture overlay */}
      <div 
        className="absolute inset-1 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(0,0,0,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '8px 8px',
        }}
      />
    </BlockComponent>
  );
}
