
export const MAX_VOLUME = 0.8;
export const MAX_EFFECTS = 3;
export const MAX_COMBINED_VOLUME = 1.2;

export const validateVolume = (value: number): number => {
  return Math.min(Math.max(0, value), MAX_VOLUME);
};

export const validateCombinedVolume = (
  volumes: Record<string, number>
): { valid: boolean; message: string | null } => {
  const totalVolume = Object.values(volumes).reduce(
    (sum, current) => sum + current,
    0
  );

  if (totalVolume > MAX_COMBINED_VOLUME) {
    return {
      valid: false,
      message: `El volumen combinado (${totalVolume.toFixed(1)}) excede el máximo (${MAX_COMBINED_VOLUME}). Por favor, reduce algunos stems.`,
    };
  }

  return { valid: true, message: null };
};

export const validateEffects = (
  activeEffects: string[]
): { valid: boolean; message: string | null } => {
  if (activeEffects.length > MAX_EFFECTS) {
    return {
      valid: false,
      message: `Demasiados efectos activos (${activeEffects.length}/${MAX_EFFECTS}). Por favor, desactiva algunos efectos.`,
    };
  }

  const hasGlitch = activeEffects.includes("glitch");
  const hasBlur = activeEffects.includes("blur");
  const hasReverb = activeEffects.includes("reverb");
  
  if (hasGlitch && hasBlur && hasReverb) {
    return {
      valid: false,
      message: "Glitch, Blur y Reverb no pueden usarse juntos. Por favor, desactiva uno.",
    };
  }

  return { valid: true, message: null };
};

export const ALLOWED_VISUAL_EFFECTS = [
  "ninguno",
  "glitch",
  "blur",
  "pulso",
  "neon",
  "onda",
] as const;

export const isVisualEffectAllowed = (effect: string): boolean => {
  return ALLOWED_VISUAL_EFFECTS.includes(effect as any);
};

export const generateVisualEffect = (
  vocalVolume: number,
  instrumentalVolume: number
): string => {
  const totalVolume = vocalVolume + instrumentalVolume;
  
  if (totalVolume > 1.0) {
    return "glitch";
  } else if (vocalVolume > 0.6) {
    return "pulso";
  } else if (instrumentalVolume > 0.6) {
    return "onda";
  }
  
  return "ninguno";
};
