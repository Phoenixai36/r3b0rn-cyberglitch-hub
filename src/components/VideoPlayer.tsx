
import React, { useRef, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import GlitchText from './GlitchText';

interface VideoPlayerProps {
  activeVisualEffect: string;
  stemLevels: Record<string, number>;
  videoUrl?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  activeVisualEffect,
  stemLevels,
  videoUrl = "/placeholder.svg" // Default to placeholder if no video provided
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculate intensity based on stem levels
  const calculateIntensity = () => {
    const total = Object.values(stemLevels).reduce((sum, val) => sum + val, 0);
    if (total > 1) return 'high';
    if (total > 0.8) return 'medium';
    return 'low';
  };
  
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    // Handle video loading state
    const handleCanPlay = () => setIsLoading(false);
    videoElement.addEventListener('canplay', handleCanPlay);
    
    // Toggle play/pause based on visual effect
    if (activeVisualEffect !== 'none' && !isPlaying) {
      videoElement.play().catch(error => {
        console.error("Video playback error:", error);
      });
      setIsPlaying(true);
    }
    
    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
    };
  }, [activeVisualEffect, isPlaying]);

  // Generate filter based on active effect
  const getVideoFilter = () => {
    switch (activeVisualEffect) {
      case 'glitch':
        return 'hue-rotate(-30deg) contrast(1.2) brightness(1.1) saturate(1.3)';
      case 'blur':
        return 'blur(2px) brightness(1.1)';
      case 'pulse':
        return 'contrast(1.1) brightness(1.2) saturate(1.2)';
      case 'neon':
        return 'brightness(1.2) contrast(1.2) saturate(1.4)';
      case 'wave':
        return 'hue-rotate(15deg) brightness(1.1)';
      default:
        return 'none';
    }
  };

  // Get animation class based on active effect
  const getAnimationClass = () => {
    switch (activeVisualEffect) {
      case 'glitch':
        return 'animate-glitch';
      case 'pulse':
        return 'animate-pulse-glow';
      default:
        return '';
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg cyber-border animated-border", 
      getAnimationClass(),
      "aspect-video"
    )}>
      {/* Video overlay effects */}
      {activeVisualEffect !== 'none' && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Horizontal scan lines */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-purple to-transparent opacity-10 mix-blend-overlay"></div>
          
          {/* Glitch effect overlay */}
          {activeVisualEffect === 'glitch' && (
            <>
              <div className="absolute inset-0 bg-cyber-pink opacity-10 mix-blend-color"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-cyber-purple animate-pulse-glow"></div>
            </>
          )}
        </div>
      )}
      
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-cyber-dark bg-opacity-70">
          <GlitchText text="LOADING..." className="text-xl" />
        </div>
      )}
      
      {/* The video player */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        loop
        muted
        style={{ filter: getVideoFilter() }}
      />
      
      {/* Effect indicator */}
      {activeVisualEffect !== 'none' && (
        <div className="absolute bottom-3 right-3 bg-cyber-dark bg-opacity-50 backdrop-blur-sm px-3 py-1 rounded text-xs uppercase font-medium border border-cyber-purple">
          <GlitchText 
            text={activeVisualEffect} 
            className="text-xs" 
            intensity={calculateIntensity() as 'low' | 'medium' | 'high'} 
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
