import React, { useState, useEffect } from 'react';
import GlitchText from '@/components/GlitchText';
import AudioController from '@/components/AudioController';
import VideoPlayer from '@/components/VideoPlayer';
import ControlPanel from '@/components/ControlPanel';
import AudioPlayer from '@/components/AudioPlayer';
import SpotifySelector from '@/components/SpotifySelector';
import VideoPrompter from '@/components/VideoPrompter';
import NavToggle from '@/components/NavToggle';
import { Toaster } from '@/components/ui/toaster';
import { generateVisualEffect } from '@/utils/validation';
import { useToast } from '@/hooks/use-toast';
import { EfectoVisual, StemControl, EfectoAudio } from '@/types/audio';
import { PistaSpotify, StemsExtraccion, spotifyService } from '@/services/spotifyService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Video } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  
  const [stemControls, setStemControls] = useState<StemControl[]>([
    { id: 'vocales', nombre: 'Vocales', volumen: 0.5 },
    { id: 'instrumental', nombre: 'Instrumental', volumen: 0.5 },
    { id: 'efectos', nombre: 'Efectos', volumen: 0.3 }
  ]);
  
  const [efectosActivos, setEfectosActivos] = useState<Record<string, boolean>>({
    glitch: false,
    reverb: false,
    delay: false,
    distorsion: false
  });
  
  const [efectoVisual, setEfectoVisual] = useState<EfectoVisual>('ninguno');
  
  const [pistaActual, setPistaActual] = useState<PistaSpotify | null>(null);
  const [stems, setStems] = useState<StemsExtraccion | null>(null);
  const [cargandoStems, setCargandoStems] = useState(false);
  
  const nivelesStems = stemControls.reduce((acc, stem) => {
    acc[stem.id] = stem.volumen;
    return acc;
  }, {} as Record<string, number>);
  
  useEffect(() => {
    const vocalVolume = nivelesStems['vocales'] || 0;
    const instrumentalVolume = nivelesStems['instrumental'] || 0;
    const efectoAuto = generateVisualEffect(vocalVolume, instrumentalVolume);
    
    if (efectoVisual === 'ninguno' && efectoAuto !== 'ninguno') {
      setEfectoVisual(efectoAuto as EfectoVisual);
      toast({
        description: `Se activó automáticamente el efecto ${efectoAuto} basado en los niveles de audio`,
      });
    }
  }, [nivelesStems, efectoVisual, toast]);

  const manejarCambioVolumen = (stemId: string, valor: number) => {
    setStemControls(prevStems => 
      prevStems.map(stem => 
        stem.id === stemId ? { ...stem, volumen: valor } : stem
      )
    );
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
        setStemControls([
          { id: 'vocales', nombre: 'Vocales', volumen: 0.6 },
          { id: 'instrumental', nombre: 'Instrumental', volumen: 0.5 },
          { id: 'efectos', nombre: 'Efectos', volumen: 0.3 }
        ]);
        setEfectosActivos({ glitch: true, reverb: false, delay: true, distorsion: false });
        setEfectoVisual('glitch');
        break;
      case 'neon_pulse':
        setStemControls([
          { id: 'vocales', nombre: 'Vocales', volumen: 0.5 },
          { id: 'instrumental', nombre: 'Instrumental', volumen: 0.7 },
          { id: 'efectos', nombre: 'Efectos', volumen: 0.2 }
        ]);
        setEfectosActivos({ glitch: false, reverb: true, delay: false, distorsion: false });
        setEfectoVisual('pulso');
        break;
      case 'glitch_noir':
        setStemControls([
          { id: 'vocales', nombre: 'Vocales', volumen: 0.7 },
          { id: 'instrumental', nombre: 'Instrumental', volumen: 0.3 },
          { id: 'efectos', nombre: 'Efectos', volumen: 0.4 }
        ]);
        setEfectosActivos({ glitch: true, reverb: false, delay: false, distorsion: true });
        setEfectoVisual('glitch');
        break;
      case 'digital_dream':
        setStemControls([
          { id: 'vocales', nombre: 'Vocales', volumen: 0.4 },
          { id: 'instrumental', nombre: 'Instrumental', volumen: 0.6 },
          { id: 'efectos', nombre: 'Efectos', volumen: 0.5 }
        ]);
        setEfectosActivos({ glitch: false, reverb: true, delay: true, distorsion: false });
        setEfectoVisual('onda');
        break;
    }
    
    toast({
      title: "Preset Aplicado",
      description: `Preset ${presetId.replace('_', ' ')} cargado exitosamente`,
    });
  };

  const seleccionarPista = async (pista: PistaSpotify) => {
    setPistaActual(pista);
    
    try {
      setCargandoStems(true);
      const nuevosStems = await spotifyService.obtenerStems(pista.id);
      setStems(nuevosStems);
      toast({
        description: `Pista "${pista.nombre}" cargada exitosamente`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error al cargar los stems de la pista"
      });
      setStems(null);
    } finally {
      setCargandoStems(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavToggle />
      
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
          <div className="lg:col-span-1 space-y-6">
            <Tabs defaultValue="audio-controller" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="audio-controller" className="data-[state=active]:bg-cyber-purple">
                  <Music className="mr-2 h-4 w-4" />
                  Control
                </TabsTrigger>
                <TabsTrigger value="spotify" className="data-[state=active]:bg-cyber-purple">
                  <Music className="mr-2 h-4 w-4" />
                  Spotify
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="audio-controller">
                <AudioController 
                  onCambioVolumen={manejarCambioVolumen}
                  onAlternarEfecto={manejarAlternarEfecto}
                />
              </TabsContent>
              
              <TabsContent value="spotify">
                <SpotifySelector 
                  onSeleccionarPista={seleccionarPista}
                />
              </TabsContent>
            </Tabs>

            <AudioPlayer 
              stems={stems}
              pistaActual={pistaActual}
              onCambioVolumen={manejarCambioVolumen}
              stemControls={stemControls}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer 
              activeVisualEffect={efectoVisual}
              stemLevels={nivelesStems}
            />
            
            <Tabs defaultValue="visual-controls" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="visual-controls" className="data-[state=active]:bg-cyber-purple">
                  <Video className="mr-2 h-4 w-4" />
                  Control Visual
                </TabsTrigger>
                <TabsTrigger value="prompter" className="data-[state=active]:bg-cyber-purple">
                  <Video className="mr-2 h-4 w-4" />
                  Generador
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="visual-controls">
                <ControlPanel 
                  onVisualEffectChange={manejarCambioEfectoVisual}
                  activeVisualEffect={efectoVisual}
                  onPresetSelect={manejarSeleccionPreset}
                />
              </TabsContent>
              
              <TabsContent value="prompter">
                <VideoPrompter 
                  onAplicarEfectoVisual={manejarCambioEfectoVisual}
                  activeVisualEffect={efectoVisual}
                />
              </TabsContent>
            </Tabs>
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
