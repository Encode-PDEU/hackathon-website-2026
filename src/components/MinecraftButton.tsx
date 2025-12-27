import React from 'react';

interface MinecraftButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary';
}

export function MinecraftButton({
  children,
  variant = 'default',
  className = '',
  ...props
}: MinecraftButtonProps) {
  return (
    <button
      className={`mc-button ${variant === 'primary' ? 'mc-button-primary' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
