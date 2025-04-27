
import React, { useState, useEffect } from 'react';
import GlitchText from '@/components/GlitchText';
import AudioController from '@/components/AudioController';
import VideoPlayer from '@/components/VideoPlayer';
import ControlPanel from '@/components/ControlPanel';
import { Toaster } from '@/components/ui/toaster';
import { generateVisualEffect } from '@/utils/validation';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [stemLevels, setStemLevels] = useState<Record<string, number>>({
    vocals: 0.5,
    instrumental: 0.5,
    effects: 0.3
  });
  
  const [activeEffects, setActiveEffects] = useState<Record<string, boolean>>({
    glitch: false,
    reverb: false,
    delay: false,
    distortion: false
  });
  
  const [visualEffect, setVisualEffect] = useState('none');
  
  useEffect(() => {
    // Generate visual effect based on stem levels
    const autoEffect = generateVisualEffect(stemLevels.vocals, stemLevels.instrumental);
    if (visualEffect === 'none' && autoEffect !== 'none') {
      setVisualEffect(autoEffect);
      toast({
        description: `Auto-activated ${autoEffect} effect based on audio levels`,
      });
    }
  }, [stemLevels, visualEffect, toast]);

  const handleVolumeChange = (stemId: string, value: number) => {
    setStemLevels(prev => ({ ...prev, [stemId]: value }));
  };

  const handleEffectToggle = (effectId: string, active: boolean) => {
    setActiveEffects(prev => ({ ...prev, [effectId]: active }));
  };

  const handleVisualEffectChange = (effect: string) => {
    setVisualEffect(effect);
    if (effect !== 'none') {
      toast({
        description: `${effect.charAt(0).toUpperCase() + effect.slice(1)} visual effect activated`,
      });
    }
  };

  const handlePresetSelect = (presetId: string) => {
    // Presets apply curated combinations (anti-trolling feature)
    switch (presetId) {
      case 'cyberpunk':
        setStemLevels({ vocals: 0.6, instrumental: 0.5, effects: 0.3 });
        setActiveEffects({ glitch: true, reverb: false, delay: true, distortion: false });
        setVisualEffect('glitch');
        break;
      case 'neon_pulse':
        setStemLevels({ vocals: 0.5, instrumental: 0.7, effects: 0.2 });
        setActiveEffects({ glitch: false, reverb: true, delay: false, distortion: false });
        setVisualEffect('pulse');
        break;
      case 'glitch_noir':
        setStemLevels({ vocals: 0.7, instrumental: 0.3, effects: 0.4 });
        setActiveEffects({ glitch: true, reverb: false, delay: false, distortion: true });
        setVisualEffect('glitch');
        break;
      case 'digital_dream':
        setStemLevels({ vocals: 0.4, instrumental: 0.6, effects: 0.5 });
        setActiveEffects({ glitch: false, reverb: true, delay: true, distortion: false });
        setVisualEffect('wave');
        break;
    }
    
    toast({
      title: "Preset Applied",
      description: `${presetId.replace('_', ' ')} preset loaded successfully`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-6">
        <div className="flex justify-center items-center">
          <GlitchText 
            text="R3B0RN" 
            className="text-4xl md:text-5xl"
          />
        </div>
        <p className="text-center text-sm text-cyber-purple mt-1">
          CyberGlitch Audio-Visual Hub
        </p>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Audio Controls */}
          <div className="lg:col-span-1">
            <AudioController 
              onVolumeChange={handleVolumeChange}
              onEffectToggle={handleEffectToggle}
            />
          </div>
          
          {/* Center/Right Column - Video Player and Controls */}
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer 
              activeVisualEffect={visualEffect}
              stemLevels={stemLevels}
            />
            
            <ControlPanel 
              onVisualEffectChange={handleVisualEffectChange}
              activeVisualEffect={visualEffect}
              onPresetSelect={handlePresetSelect}
            />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-3 px-6 text-center">
        <div className="text-sm text-muted-foreground">
          <span className="text-cyber-purple">R3B0RN</span> © 2025 | CyberGlitch Hub
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
