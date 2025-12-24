import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PixelButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  gold: 'bg-gold text-gold-foreground hover:bg-gold/90',
  danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
};

const sizeStyles = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function PixelButton({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: PixelButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'font-pixel relative inline-flex items-center justify-center',
        'border-4 border-border',
        'transition-all duration-150',
        variantStyles[variant],
        sizeStyles[size],
        'shadow-pixel hover:shadow-glow',
        'before:absolute before:inset-0 before:border-t-4 before:border-l-4 before:border-white/20',
        'after:absolute after:inset-0 after:border-b-4 after:border-r-4 after:border-black/30',
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
