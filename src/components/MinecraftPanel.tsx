import React from 'react';
import { cn } from '@/lib/utils';

interface MinecraftPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  useTexture?: boolean; // if true, use panel.png via border-image; else CSS-only panel
}

/**
 * Minecraft-styled panel to replace modern cards.
 * Defaults to CSS recreation for reliable scaling.
 * Optionally uses panel.png via border-image when useTexture is true.
 */
export function MinecraftPanel({
  className,
  children,
  useTexture = false,
  style,
  ...props
}: MinecraftPanelProps) {
  const baseStyle: React.CSSProperties = useTexture
    ? {
        // Border-image approach; assumes panel.png is a 9-slice compatible asset
        borderStyle: 'solid',
        borderWidth: '12px',
        borderImage: 'url(/imgs/ui/panel.png) 12 fill / 1 / 0 stretch',
        backgroundColor: '#C6C6C6',
      }
    : {
        backgroundColor: '#C6C6C6',
        border: '3px solid #000',
        boxShadow: 'inset 3px 3px 0px #FFF, inset -3px -3px 0px #555',
      };

  return (
    <div
      className={cn('relative p-3 sm:p-4 select-none', className)}
      style={{ ...baseStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export default MinecraftPanel;
