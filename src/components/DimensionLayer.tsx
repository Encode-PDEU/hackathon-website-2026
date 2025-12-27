import React from 'react';

interface DimensionLayerProps {
  type: 'nether' | 'end';
  children: React.ReactNode;
}

export function DimensionLayer({ type, children }: DimensionLayerProps) {
  const bg = type === 'nether' ? '/imgs/blocks/netherrack.png' : '/imgs/blocks/end-stone.png';
  const overlay = type === 'nether' ? 'bg-red-900/20' : 'bg-black/80'; // Darker for End
  
  return (
    <div className="relative w-full">
      {/* Tiling Texture Background */}
      <div 
        className="absolute inset-0 -z-20" 
        style={{ 
          backgroundImage: `url(${bg})`, 
          backgroundSize: '64px', 
          imageRendering: 'pixelated' 
        }} 
      />
      {/* Color Tint Overlay */}
      <div className={`absolute inset-0 -z-10 ${overlay}`} />
      
      {/* Content */}
      <div className="relative z-10 py-20">
        {children}
      </div>
      
      {/* Bottom Bedrock Separator */}
      <div 
        className="h-16 w-full" 
        style={{ 
          backgroundImage: 'url(/imgs/blocks/bedrock.png)', 
          backgroundSize: '64px',
          imageRendering: 'pixelated'
        }} 
      />
    </div>
  );
}
