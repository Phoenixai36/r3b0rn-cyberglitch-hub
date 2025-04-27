
export interface StemControl {
  id: string;
  nombre: string;
  volumen: number;
}

export interface EfectoAudio {
  id: string;
  nombre: string;
  activo: boolean;
}

export type EfectoVisual = 'ninguno' | 'glitch' | 'blur' | 'pulso' | 'neon' | 'onda';

export type PresetAudio = {
  id: string;
  nombre: string;
  efectos: string[];
  volumenes: Record<string, number>;
  efectoVisual: EfectoVisual;
};
