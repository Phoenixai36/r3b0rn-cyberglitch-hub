
import React, { useState } from 'react';
import { validateVolume, validateCombinedVolume, validateEffects } from '@/utils/validation';
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { StemControl, EfectoAudio } from '@/types/audio';

interface AudioControllerProps {
  onCambioVolumen: (stemId: string, valor: number) => void;
  onAlternarEfecto: (efectoId: string, activo: boolean) => void;
}

const AudioController = ({ 
  onCambioVolumen, 
  onAlternarEfecto 
}: AudioControllerProps) => {
  const { toast } = useToast();
  
  const [stems, setStems] = useState<StemControl[]>([
    { id: 'vocales', nombre: 'Vocales', volumen: 0.5 },
    { id: 'instrumental', nombre: 'Instrumental', volumen: 0.5 },
    { id: 'efectos', nombre: 'Efectos', volumen: 0.3 },
  ]);

  const [efectos, setEfectos] = useState<EfectoAudio[]>([
    { id: 'glitch', nombre: 'Glitch', activo: false },
    { id: 'reverb', nombre: 'Reverberación', activo: false },
    { id: 'delay', nombre: 'Retraso', activo: false },
    { id: 'distorsion', nombre: 'Distorsión', activo: false },
  ]);

  const manejarCambioVolumen = (stemId: string, nuevoValor: number) => {
    const valorValidado = validateVolume(nuevoValor);
    
    const stemsActualizados = stems.map(stem => 
      stem.id === stemId 
        ? { ...stem, volumen: valorValidado } 
        : stem
    );
    
    const volumenes = stemsActualizados.reduce((acc, stem) => {
      acc[stem.id] = stem.volumen;
      return acc;
    }, {} as Record<string, number>);
    
    const validacion = validateCombinedVolume(volumenes);
    
    if (!validacion.valid) {
      toast({
        title: "Límite de Volumen Alcanzado",
        description: validacion.message,
        variant: "destructive"
      });
      return;
    }
    
    setStems(stemsActualizados);
    onCambioVolumen(stemId, valorValidado);
  };

  const manejarAlternarEfecto = (efectoId: string) => {
    const efectosActualizados = efectos.map(efecto => 
      efecto.id === efectoId 
        ? { ...efecto, activo: !efecto.activo } 
        : efecto
    );
    
    const efectosActivos = efectosActualizados
      .filter(efecto => efecto.activo)
      .map(efecto => efecto.id);
    
    const validacion = validateEffects(efectosActivos);
    
    if (!validacion.valid) {
      toast({
        title: "Límite de Efectos Alcanzado",
        description: validacion.message,
        variant: "destructive"
      });
      return;
    }
    
    setEfectos(efectosActualizados);
    const efectoAlternado = efectosActualizados.find(e => e.id === efectoId);
    if (efectoAlternado) {
      onAlternarEfecto(efectoId, efectoAlternado.activo);
    }
  };

  return (
    <div className="rounded-lg cyber-border p-4 bg-cyber-dark bg-opacity-70 backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 text-cyber-purple">Control de Audio</h2>
      
      <div className="space-y-6 mb-8">
        {stems.map((stem) => (
          <div key={stem.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-cyber-purple">
                {stem.nombre}
              </label>
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
                onChange={(e) => manejarCambioVolumen(stem.id, parseFloat(e.target.value))}
              />
            </div>
          </div>
        ))}
      </div>
      
      <h3 className="text-md font-semibold mb-3 text-cyber-purple">Efectos</h3>
      <div className="grid grid-cols-2 gap-3">
        {efectos.map((efecto) => (
          <div 
            key={efecto.id} 
            className={`flex items-center justify-between p-2 rounded ${
              efecto.activo 
                ? 'bg-cyber-purple bg-opacity-20' 
                : 'bg-cyber-dark bg-opacity-40'
            }`}
          >
            <span className="text-sm">{efecto.nombre}</span>
            <Switch
              checked={efecto.activo}
              onCheckedChange={() => manejarAlternarEfecto(efecto.id)}
              className={efecto.activo ? 'data-[state=checked]:bg-cyber-pink' : ''}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioController;
