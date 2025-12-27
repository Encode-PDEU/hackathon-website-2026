import React, { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface MinecraftLayoutProps {
  children: React.ReactNode;
  blockSize?: number;
  className?: string;
}

/**
 * MinecraftLayout: Wrapper component that sets up CSS variables for Minecraft theme
 * - Sets --block-size for all sizing calculations
 * - Enables all Minecraft CSS classes to work properly
 * - Use this as a wrapper around your entire app or sections
 */
export function MinecraftLayout({
  children,
  blockSize = 48,
  className,
}: MinecraftLayoutProps) {
  const style: CSSProperties = {
    '--block-size': `${blockSize}px`,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        'min-h-screen w-full font-minecraft',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export default MinecraftLayout;
