
// Anti-trolling validation utility for R3B0RN platform

// Max values for stem controls (anti-troll measures)
export const MAX_VOLUME = 0.8;
export const MAX_EFFECTS = 3;
export const MAX_COMBINED_VOLUME = 1.2;

// Validate volume levels to prevent trolling with extreme settings
export const validateVolume = (value: number): number => {
  // Clamp value between 0 and MAX_VOLUME
  return Math.min(Math.max(0, value), MAX_VOLUME);
};

// Validate if combined stem volumes are within allowed range
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
      message: `Combined volume (${totalVolume.toFixed(1)}) exceeds maximum (${MAX_COMBINED_VOLUME}). Please reduce some stems.`,
    };
  }

  return { valid: true, message: null };
};

// Validate effects to ensure they stay within aesthetic guidelines
export const validateEffects = (
  activeEffects: string[]
): { valid: boolean; message: string | null } => {
  // Check if number of effects exceeds maximum
  if (activeEffects.length > MAX_EFFECTS) {
    return {
      valid: false,
      message: `Too many effects active (${activeEffects.length}/${MAX_EFFECTS}). Please disable some effects.`,
    };
  }

  // Check for incompatible effect combinations
  const hasGlitch = activeEffects.includes("glitch");
  const hasBlur = activeEffects.includes("blur");
  const hasReverb = activeEffects.includes("reverb");
  
  if (hasGlitch && hasBlur && hasReverb) {
    return {
      valid: false,
      message: "Glitch, Blur and Reverb cannot be used together. Please disable one.",
    };
  }

  return { valid: true, message: null };
};

// Allowed visual effects (curated set to prevent chaos)
export const ALLOWED_VISUAL_EFFECTS = [
  "none",
  "glitch",
  "blur",
  "pulse",
  "neon",
  "wave",
];

// Check if a visual effect is allowed
export const isVisualEffectAllowed = (effect: string): boolean => {
  return ALLOWED_VISUAL_EFFECTS.includes(effect);
};

// Generate a safe visual effect based on stem settings
export const generateVisualEffect = (
  vocalVolume: number,
  instrumentalVolume: number
): string => {
  const totalVolume = vocalVolume + instrumentalVolume;
  
  if (totalVolume > 1.0) {
    return "glitch";
  } else if (vocalVolume > 0.6) {
    return "pulse";
  } else if (instrumentalVolume > 0.6) {
    return "wave";
  }
  
  return "none";
};
