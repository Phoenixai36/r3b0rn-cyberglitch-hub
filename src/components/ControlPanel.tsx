
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Video, Settings } from "lucide-react";
import { ALLOWED_VISUAL_EFFECTS } from '@/utils/validation';
import { cn } from '@/lib/utils';
import { EfectoVisual } from '@/types/audio';

interface ControlPanelProps {
  onVisualEffectChange: (effect: EfectoVisual) => void;
  activeVisualEffect: EfectoVisual;
  onPresetSelect: (preset: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onVisualEffectChange,
  activeVisualEffect,
  onPresetSelect
}) => {
  const presets = [
    { id: 'cyberpunk', name: 'Cyberpunk' },
    { id: 'neon_pulse', name: 'Neon Pulse' },
    { id: 'glitch_noir', name: 'Glitch Noir' },
    { id: 'digital_dream', name: 'Digital Dream' },
  ];

  return (
    <div className="cyber-border bg-cyber-dark/70 backdrop-blur-sm rounded-lg p-4 border-cyber-purple/40">
      <Tabs defaultValue="visuals">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="visuals" className="data-[state=active]:bg-cyber-purple">
            <Video className="mr-2 h-4 w-4" />
            Visuales
          </TabsTrigger>
          <TabsTrigger value="presets" className="data-[state=active]:bg-cyber-purple">
            <Music className="mr-2 h-4 w-4" />
            Presets
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-cyber-purple">
            <Settings className="mr-2 h-4 w-4" />
            Ajustes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="visuals">
          <div>
            <h3 className="text-md font-semibold mb-3 text-cyber-purple">Efectos Visuales</h3>
            <div className="grid grid-cols-3 gap-2">
              {ALLOWED_VISUAL_EFFECTS.map((effect) => (
                <Button 
                  key={effect} 
                  onClick={() => onVisualEffectChange(effect as EfectoVisual)}
                  variant={activeVisualEffect === effect ? "default" : "outline"}
                  className={cn(
                    activeVisualEffect === effect ? "bg-cyber-purple hover:bg-cyber-purple/90" : "",
                    "text-sm h-auto py-2 border-cyber-purple/40 hover:border-cyber-pink/70"
                  )}
                >
                  {effect === 'ninguno' ? 'Ninguno' : 
                   effect.charAt(0).toUpperCase() + effect.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="presets">
          <div>
            <h3 className="text-md font-semibold mb-3 text-cyber-purple">Curated Presets</h3>
            <div className="grid grid-cols-2 gap-3">
              {presets.map((preset) => (
                <Button 
                  key={preset.id} 
                  onClick={() => onPresetSelect(preset.id)}
                  variant="outline"
                  className="border border-cyber-purple/40 hover:border-cyber-purple/70 h-auto py-3"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Presets apply curated combinations of audio and visual settings.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div>
            <h3 className="text-md font-semibold mb-3 text-cyber-purple">Global Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Quality</span>
                <select className="bg-cyber-dark text-xs p-1 rounded border border-cyber-purple/30">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Sync Mode</span>
                <select className="bg-cyber-dark text-xs p-1 rounded border border-cyber-purple/30">
                  <option>Real-time</option>
                  <option>Delayed</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Settings will apply immediately to your session.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ControlPanel;
