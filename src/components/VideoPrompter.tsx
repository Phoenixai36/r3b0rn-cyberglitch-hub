
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Video, RotateCcw } from "lucide-react";
import GlitchText from './GlitchText';
import { EfectoVisual } from '@/types/audio';
import { cn } from "@/lib/utils";

interface VideoPrompterProps {
  onAplicarEfectoVisual: (efecto: EfectoVisual) => void;
  activeVisualEffect: EfectoVisual;
}

const VideoPrompter: React.FC<VideoPrompterProps> = ({
  onAplicarEfectoVisual,
  activeVisualEffect
}) => {
  const [prompt, setPrompt] = useState('');
  const [generando, setGenerando] = useState(false);
  const [sugerencias, setSugerencias] = useState<string[]>([]);
  const { toast } = useToast();

  // Lista de sugerencias predefinidas para prompts
  const sugerenciasPrompts = [
    "Cyberpunk neon en la ciudad futurista",
    "Glitch digital con efectos ondulados",
    "Atmósfera de neón púrpura y azul",
    "Paisaje digital con ondas de audio visuales",
    "Estética vaporwave con elementos retro",
    "Calles nocturnas con luces de neón",
    "Interfaz cibernética con código fluyendo",
    "Distorsión visual inspirada en VHS"
  ];

  // Simula la generación de un videoclip basado en el prompt
  const generarVideoClip = async () => {
    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        description: "Por favor, escribe un prompt para generar el videoclip"
      });
      return;
    }
    
    // Validar el prompt para evitar trolleo
    if (validarPrompt(prompt)) {
      try {
        setGenerando(true);
        
        // Simular proceso de generación
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Determinar qué efecto visual aplicar basado en el prompt
        const efectoSeleccionado = seleccionarEfecto(prompt);
        onAplicarEfectoVisual(efectoSeleccionado);
        
        toast({
          description: "¡Videoclip generado con éxito!"
        });
        
        // Generar nuevas sugerencias basadas en el prompt actual
        generarSugerencias(prompt);
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Error al generar el videoclip"
        });
      } finally {
        setGenerando(false);
      }
    } else {
      toast({
        variant: "destructive",
        description: "El prompt contiene elementos no permitidos. Por favor, modifícalo."
      });
    }
  };

  // Validar que el prompt no contenga elementos de trolleo o términos prohibidos
  const validarPrompt = (texto: string): boolean => {
    const terminosProhibidos = [
      "caos", "destrucción", "ofensivo", "flood", "spam",
      "flash", "epilepsia", "trollear", "basura"
    ];
    
    const textoLower = texto.toLowerCase();
    return !terminosProhibidos.some(termino => textoLower.includes(termino));
  };

  // Seleccionar un efecto visual basado en el contenido del prompt
  const seleccionarEfecto = (texto: string): EfectoVisual => {
    const textoLower = texto.toLowerCase();
    
    if (textoLower.includes("glitch") || textoLower.includes("distorsión")) {
      return "glitch";
    } else if (textoLower.includes("blur") || textoLower.includes("desenfoque")) {
      return "blur";
    } else if (textoLower.includes("pulso") || textoLower.includes("latido")) {
      return "pulso";
    } else if (textoLower.includes("neon") || textoLower.includes("neón")) {
      return "neon";
    } else if (textoLower.includes("onda") || textoLower.includes("wave")) {
      return "onda";
    }
    
    // Selección aleatoria entre efectos disponibles como fallback
    const efectos: EfectoVisual[] = ["glitch", "blur", "pulso", "neon", "onda"];
    return efectos[Math.floor(Math.random() * efectos.length)];
  };

  // Generar sugerencias de prompts similares al actual
  const generarSugerencias = (textoBase: string) => {
    // En un sistema real, esto podría usar NLP para generar variaciones
    // Aquí usamos una selección simple basada en palabras clave
    
    const nuevasSugerencias = sugerenciasPrompts
      .filter(sugerencia => {
        // Encontrar sugerencias que compartan al menos una palabra con el prompt actual
        const palabrasBase = textoBase.toLowerCase().split(/\s+/);
        const palabrasSugerencia = sugerencia.toLowerCase().split(/\s+/);
        return palabrasBase.some(p => palabrasSugerencia.some(s => s.includes(p) || p.includes(s)));
      })
      .slice(0, 3); // Limitar a 3 sugerencias
    
    setSugerencias(nuevasSugerencias.length > 0 ? nuevasSugerencias : sugerenciasPrompts.slice(0, 3));
  };

  return (
    <div className="cyber-border bg-cyber-dark/70 backdrop-blur-sm rounded-lg p-4 border-cyber-purple/40">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-cyber-purple">Generador de Videoclips</h3>
        <div className={cn(
          "px-2 py-1 rounded text-xs uppercase",
          activeVisualEffect !== "ninguno" 
            ? "bg-cyber-purple/20 text-cyber-pink" 
            : "bg-cyber-dark/50 text-muted-foreground"
        )}>
          {activeVisualEffect === "ninguno" 
            ? "Sin efecto" 
            : `Efecto: ${activeVisualEffect}`}
        </div>
      </div>
      
      <div className="mb-4">
        <Textarea
          placeholder="Describe el videoclip que deseas generar... (ej: 'Cyberpunk neon con distorsión glitch')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-24 bg-cyber-dark/60 border-cyber-purple/30 focus:border-cyber-pink/50"
        />
      </div>
      
      <div className="flex justify-between mb-4">
        <Button 
          onClick={generarVideoClip} 
          disabled={generando || !prompt.trim()} 
          className="bg-cyber-purple hover:bg-cyber-purple/90"
        >
          {generando ? (
            <>
              <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Video className="mr-2 h-4 w-4" />
              Generar Videoclip
            </>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => onAplicarEfectoVisual("ninguno")}
          disabled={activeVisualEffect === "ninguno"}
          className="border-cyber-purple/40"
        >
          Limpiar Efecto
        </Button>
      </div>
      
      {sugerencias.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2 text-cyber-purple">Sugerencias</h4>
          <div className="flex flex-wrap gap-2">
            {sugerencias.map((sugerencia, index) => (
              <Button 
                key={index}
                variant="ghost" 
                size="sm"
                onClick={() => setPrompt(sugerencia)}
                className="text-xs border border-cyber-purple/30 hover:bg-cyber-purple/20"
              >
                {sugerencia}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 pt-3 border-t border-cyber-purple/20">
        <p className="text-xs text-muted-foreground">
          Los videoclips generados se adaptan automáticamente a los ajustes de audio y
          mantienen la estética cyberpunk del proyecto R3B0RN.
        </p>
      </div>
    </div>
  );
};

export default VideoPrompter;
