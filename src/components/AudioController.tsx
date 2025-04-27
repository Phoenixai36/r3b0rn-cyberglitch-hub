
import React, { useState, useEffect } from 'react';
import { 
  validateVolume, 
  validateCombinedVolume, 
  validateEffects 
} from '@/utils/validation';
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

interface AudioStem {
  id: string;
  name: string;
  volume: number;
}

interface Effect {
  id: string;
  name: string;
  active: boolean;
}

interface AudioControllerProps {
  onVolumeChange: (stemId: string, value: number) => void;
  onEffectToggle: (effectId: string, active: boolean) => void;
}

const AudioController: React.FC<AudioControllerProps> = ({ 
  onVolumeChange, 
  onEffectToggle 
}) => {
  const { toast } = useToast();
  
  const [stems, setStems] = useState<AudioStem[]>([
    { id: 'vocals', name: 'Vocals', volume: 0.5 },
    { id: 'instrumental', name: 'Instrumental', volume: 0.5 },
    { id: 'effects', name: 'SFX', volume: 0.3 },
  ]);

  const [effects, setEffects] = useState<Effect[]>([
    { id: 'glitch', name: 'Glitch', active: false },
    { id: 'reverb', name: 'Reverb', active: false },
    { id: 'delay', name: 'Delay', active: false },
    { id: 'distortion', name: 'Distortion', active: false },
  ]);

  const handleVolumeChange = (stemId: string, newValue: number) => {
    const validatedValue = validateVolume(newValue);
    
    // Create updated stems array for validation
    const updatedStems = stems.map(stem => 
      stem.id === stemId 
        ? { ...stem, volume: validatedValue } 
        : stem
    );
    
    // Validate combined volume
    const volumesMap = updatedStems.reduce((acc, stem) => {
      acc[stem.id] = stem.volume;
      return acc;
    }, {} as Record<string, number>);
    
    const validation = validateCombinedVolume(volumesMap);
    
    if (!validation.valid) {
      toast({
        title: "Volume Limit Reached",
        description: validation.message,
        variant: "destructive"
      });
      return;
    }
    
    // Update state and propagate change to parent
    setStems(updatedStems);
    onVolumeChange(stemId, validatedValue);
  };

  const handleEffectToggle = (effectId: string) => {
    // Create updated effects array
    const updatedEffects = effects.map(effect => 
      effect.id === effectId 
        ? { ...effect, active: !effect.active } 
        : effect
    );
    
    // Get list of active effects after toggle
    const activeEffects = updatedEffects
      .filter(effect => effect.active)
      .map(effect => effect.id);
    
    // Validate effects
    const validation = validateEffects(activeEffects);
    
    if (!validation.valid) {
      toast({
        title: "Effect Limit Reached",
        description: validation.message,
        variant: "destructive"
      });
      return;
    }
    
    // Update state and propagate change to parent
    setEffects(updatedEffects);
    const toggledEffect = updatedEffects.find(e => e.id === effectId);
    if (toggledEffect) {
      onEffectToggle(effectId, toggledEffect.active);
    }
  };

  return (
    <div className="rounded-lg cyber-border p-4 bg-cyber-dark bg-opacity-70 backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 text-cyber-purple">Audio Control</h2>
      
      {/* Stem volume controls */}
      <div className="space-y-6 mb-8">
        {stems.map((stem) => (
          <div key={stem.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-cyber-purple">
                {stem.name}
              </label>
              <span className="text-xs bg-cyber-dark px-2 py-1 rounded">
                {Math.round(stem.volume * 100)}%
              </span>
            </div>
            <div className="px-1">
              <input
                type="range"
                className="cyber-slider w-full"
                min="0"
                max="0.8"
                step="0.01"
                value={stem.volume}
                onChange={(e) => handleVolumeChange(stem.id, parseFloat(e.target.value))}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Audio effects */}
      <h3 className="text-md font-semibold mb-3 text-cyber-purple">Effects</h3>
      <div className="grid grid-cols-2 gap-3">
        {effects.map((effect) => (
          <div 
            key={effect.id} 
            className={`flex items-center justify-between p-2 rounded ${
              effect.active 
                ? 'bg-cyber-purple bg-opacity-20' 
                : 'bg-cyber-dark bg-opacity-40'
            }`}
          >
            <span className="text-sm">{effect.name}</span>
            <Switch
              checked={effect.active}
              onCheckedChange={() => handleEffectToggle(effect.id)}
              className={effect.active ? 'data-[state=checked]:bg-cyber-pink' : ''}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioController;
