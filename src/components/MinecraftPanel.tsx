import React from 'react';
import { cn } from '@/lib/utils';

interface MinecraftPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark';
}

export function MinecraftPanel({ children, className, variant = 'default' }: MinecraftPanelProps) {
  return (
    <div 
      className={cn(
        "relative p-6 text-black transition-transform duration-200 hover:rotate-1 hover:scale-105",
        className
      )}
      style={{
        // 9-Slice Scaling Magic
        borderImage: `url(/imgs/ui/${variant === 'dark' ? 'panel-dark.png' : 'panel.png'}) 16 fill repeat`,
        borderWidth: '16px',
        borderStyle: 'solid',
        imageRendering: 'pixelated',
      }}
    >
      {children}
    </div>
  );
}

export default MinecraftPanel;
