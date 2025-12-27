import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMinecraftSound } from '@/hooks/useMinecraftSound';

interface PixelButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/* Hardcore MC button styling overrides */
const variantStyles = {
  primary: '',
  secondary: '',
  gold: '',
  danger: '',
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
  const { play } = useMinecraftSound(0.6);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (props.onClick) props.onClick(e);
    play();
  };
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'font-pixel relative inline-flex items-center justify-center select-none',
        'transition-all duration-100',
        sizeStyles[size],
        'transform active:translate-y-[2px]',
        'border-2 border-black',
        'bg-[#D0D0D0] hover:bg-[#bcbcff] active:bg-[#a0a0a0]',
        'shadow-[inset_2px_2px_0_#FFFFFF,inset_-2px_-2px_0_#555555]',
        'active:shadow-[inset_2px_2px_0_#555555,inset_-2px_-2px_0_#FFFFFF]',
        className
      )}
      {...props}
      onClick={handleClick}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
