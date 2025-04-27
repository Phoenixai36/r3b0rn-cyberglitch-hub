
import React, { useState, useEffect } from 'react';
import GlitchText from '@/components/GlitchText';
import AudioController from '@/components/AudioController';
import VideoPlayer from '@/components/VideoPlayer';
import ControlPanel from '@/components/ControlPanel';
import { Toaster } from '@/components/ui/toaster';
import { generateVisualEffect } from '@/utils/validation';
import { useToast } from '@/components/ui/use-toast';
import { EfectoVisual } from '@/types/audio';

const Index = () => {
  const { toast } = useToast();
  const [nivelesStems, setNivelesStems] = useState<Record<string, number>>({
    vocales: 0.5,
    instrumental: 0.5,
    efectos: 0.3
  });
  
  const [efectosActivos, setEfectosActivos] = useState<Record<string, boolean>>({
    glitch: false,
    reverb: false,
    delay: false,
    distorsion: false
  });
  
  const [efectoVisual, setEfectoVisual] = useState<EfectoVisual>('ninguno');
  
  useEffect(() => {
    const efectoAuto = generateVisualEffect(nivelesStems.vocales, nivelesStems.instrumental);
    if (efectoVisual === 'ninguno' && efectoAuto !== 'ninguno') {
      setEfectoVisual(efectoAuto as EfectoVisual);
      toast({
        description: `Se activó automáticamente el efecto ${efectoAuto} basado en los niveles de audio`,
      });
    }
  }, [nivelesStems, efectoVisual, toast]);

  const manejarCambioVolumen = (stemId: string, valor: number) => {
    setNivelesStems(prev => ({ ...prev, [stemId]: valor }));
  };

  const manejarAlternarEfecto = (efectoId: string, activo: boolean) => {
    setEfectosActivos(prev => ({ ...prev, [efectoId]: activo }));
  };

  const manejarCambioEfectoVisual = (efecto: EfectoVisual) => {
    setEfectoVisual(efecto);
    if (efecto !== 'ninguno') {
      toast({
        description: `Efecto visual ${efecto} activado`,
      });
    }
  };

  const manejarSeleccionPreset = (presetId: string) => {
    switch (presetId) {
      case 'cyberpunk':
        setNivelesStems({ vocales: 0.6, instrumental: 0.5, efectos: 0.3 });
        setEfectosActivos({ glitch: true, reverb: false, delay: true, distorsion: false });
        setEfectoVisual('glitch');
        break;
      case 'neon_pulse':
        setNivelesStems({ vocales: 0.5, instrumental: 0.7, efectos: 0.2 });
        setEfectosActivos({ glitch: false, reverb: true, delay: false, distorsion: false });
        setEfectoVisual('pulso');
        break;
      case 'glitch_noir':
        setNivelesStems({ vocales: 0.7, instrumental: 0.3, efectos: 0.4 });
        setEfectosActivos({ glitch: true, reverb: false, delay: false, distorsion: true });
        setEfectoVisual('glitch');
        break;
      case 'digital_dream':
        setNivelesStems({ vocales: 0.4, instrumental: 0.6, efectos: 0.5 });
        setEfectosActivos({ glitch: false, reverb: true, delay: true, distorsion: false });
        setEfectoVisual('onda');
        break;
    }
    
    toast({
      title: "Preset Aplicado",
      description: `Preset ${presetId.replace('_', ' ')} cargado exitosamente`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
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
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AudioController 
              onCambioVolumen={manejarCambioVolumen}
              onAlternarEfecto={manejarAlternarEfecto}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer 
              activeVisualEffect={efectoVisual}
              stemLevels={nivelesStems}
            />
            
            <ControlPanel 
              onVisualEffectChange={manejarCambioEfectoVisual}
              activeVisualEffect={efectoVisual}
              onPresetSelect={manejarSeleccionPreset}
            />
          </div>
        </div>
      </main>
      
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
