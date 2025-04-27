
import React from 'react';
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  className,
  intensity = 'medium'
}) => {
  // Apply different animation classes based on intensity
  const getAnimationClass = () => {
    switch (intensity) {
      case 'low':
        return 'animate-[glitch_4s_ease-in-out_infinite]';
      case 'high':
        return 'animate-[glitch_0.5s_ease-in-out_infinite]';
      case 'medium':
      default:
        return 'animate-glitch';
    }
  };

  return (
    <h1 
      className={cn(
        "glitch-text font-cyber font-bold", 
        getAnimationClass(),
        className
      )} 
      data-text={text}
    >
      {text}
    </h1>
  );
};

export default GlitchText;
