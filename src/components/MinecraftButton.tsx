import React from 'react';
import { cn } from '@/lib/utils';
import { useMinecraftSound } from '@/hooks/useMinecraftSound';

interface MinecraftButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'danger';
}

export function MinecraftButton({ children, className, variant = 'default', onClick, ...props }: MinecraftButtonProps) {
  const { play } = useMinecraftSound();

  return (
    <button
      onClick={(e) => {
        play();
        onClick?.(e);
      }}
      className={cn(
        "relative px-4 py-2 text-white font-minecraft shadow-sm active:translate-y-1 transition-transform",
        "hover:brightness-110",
        className
      )}
      style={{
        borderImage: `url(/imgs/ui/button.png) 6 fill repeat`,
        borderWidth: '6px',
        borderStyle: 'solid',
        imageRendering: 'pixelated',
        textShadow: '2px 2px #202020'
      }}
      {...props}
    >
      {children}
    </button>
  );
}
