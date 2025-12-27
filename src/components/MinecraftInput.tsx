import React from 'react';

interface MinecraftInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function MinecraftInput({ className = '', ...props }: MinecraftInputProps) {
  return (
    <input
      className={`mc-input ${className}`}
      {...props}
    />
  );
}
