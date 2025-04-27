
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, Music } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { PistaSpotify, StemsExtraccion } from '@/services/spotifyService';
import GlitchText from './GlitchText';
import { StemControl } from '@/types/audio';
import { validateVolume } from '@/utils/validation';
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  stems: StemsExtraccion | null;
  pistaActual: PistaSpotify | null;
  onCambioVolumen: (stemId: string, valor: number) => void;
  stemControls: StemControl[];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  stems,
  pistaActual,
  onCambioVolumen,
  stemControls
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeStems, setActiveStems] = useState<Record<string, boolean>>({
    vocal: true,
    instrumental: true,
    efectos: true
  });

  // Referencias a los elementos de audio
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({
    vocal: null,
    instrumental: null,
    efectos: null,
    original: null
  });
  
  // Efecto para sincronizar los elementos de audio cuando cambian los stems
  useEffect(() => {
    if (stems) {
      Object.keys(stems).forEach((key) => {
        if (audioRefs.current[key]) {
          audioRefs.current[key]!.src = stems[key as keyof StemsExtraccion];
          audioRefs.current[key]!.load();
        }
      });
      
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [stems]);

  // Efecto para actualizar el tiempo actual durante la reproducción
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && audioRefs.current.original) {
        setCurrentTime(audioRefs.current.original.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Manejador para cambiar el volumen de un stem
  const handleVolumeChange = (stemId: string, value: number) => {
    const validatedVolume = validateVolume(value);
    onCambioVolumen(stemId, validatedVolume);
    
    if (audioRefs.current[stemId]) {
      audioRefs.current[stemId]!.volume = validatedVolume;
    }
  };

  // Manejador para alternar la reproducción de un stem
  const toggleStem = (stemId: string) => {
    setActiveStems(prev => {
      const newState = { ...prev, [stemId]: !prev[stemId] };
      
      if (audioRefs.current[stemId]) {
        audioRefs.current[stemId]!.muted = !newState[stemId];
      }
      
      return newState;
    });
  };

  // Manejador para reproducir o pausar la música
  const togglePlayPause = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        if (newState) {
          audio.play().catch(e => {
            console.error("Error al reproducir audio:", e);
            setIsPlaying(false);
          });
        } else {
          audio.pause();
        }
      }
    });
  };

  // Manejador para buscar en la pista
  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.currentTime = newTime;
      }
    });
  };

  // Formatear tiempo para mostrar (mm:ss)
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="cyber-border bg-cyber-dark/70 backdrop-blur-sm rounded-lg p-4 border-cyber-purple/40">
      <div className="mb-4">
        {pistaActual ? (
          <div className="flex items-center space-x-4">
            {pistaActual.albumImagen && (
              <img 
                src={pistaActual.albumImagen}
                alt={pistaActual.nombre}
                className="h-14 w-14 cyber-border"
              />
            )}
            <div>
              <h3 className="text-md font-semibold text-cyber-purple">
                <GlitchText text={pistaActual.nombre} className="text-lg" />
              </h3>
              <p className="text-sm text-muted-foreground">{pistaActual.artista}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-16 bg-cyber-dark rounded border border-cyber-purple/30">
            <p className="text-sm text-muted-foreground">Ninguna pista seleccionada</p>
          </div>
        )}
      </div>

      {/* Controles de reproducción */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
        <Slider 
          value={[currentTime]}
          min={0}
          max={duration || 30}
          step={0.1}
          onValueChange={handleSeek}
          className="mb-4"
        />
        <div className="flex items-center justify-center space-x-4">
          <Button 
            variant="outline" 
            size="icon"
            disabled={!stems}
            className="border-cyber-purple/40"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button 
            variant="default" 
            size="icon"
            disabled={!stems}
            onClick={togglePlayPause}
            className="bg-cyber-purple hover:bg-cyber-purple/90 h-10 w-10"
          >
            {isPlaying ? 
              <Pause className="h-5 w-5" /> : 
              <Play className="h-5 w-5" />
            }
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            disabled={!stems}
            className="border-cyber-purple/40"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Controles de stems */}
      <div className="space-y-4 mt-6">
        <h4 className="text-sm font-medium mb-2 text-cyber-purple">Control de Stems</h4>
        
        {stemControls.map((stem) => (
          <div key={stem.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "p-1 h-6 mr-2",
                    activeStems[stem.id] 
                      ? "text-cyber-pink" 
                      : "text-muted-foreground"
                  )}
                  onClick={() => toggleStem(stem.id)}
                >
                  <Music className="h-3 w-3 mr-1" />
                  <span className="text-xs">{stem.nombre}</span>
                </Button>
              </div>
              <span className="text-xs bg-cyber-dark px-2 py-1 rounded">
                {Math.round(stem.volumen * 100)}%
              </span>
            </div>
            <div className="px-1">
              <input
                type="range"
                className="cyber-slider w-full"
                min="0"
                max="0.8"
                step="0.01"
                value={stem.volumen}
                onChange={(e) => handleVolumeChange(stem.id, parseFloat(e.target.value))}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Elementos de audio (ocultos) */}
      <div className="hidden">
        <audio
          ref={el => audioRefs.current.vocal = el}
          preload="auto"
          onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration)}
        />
        <audio
          ref={el => audioRefs.current.instrumental = el}
          preload="auto"
        />
        <audio
          ref={el => audioRefs.current.efectos = el}
          preload="auto"
        />
        <audio
          ref={el => audioRefs.current.original = el}
          preload="auto"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
