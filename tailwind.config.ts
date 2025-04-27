
import { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Colores personalizados para el tema de R3B0RN
        "cyber-dark": {
          DEFAULT: "#0a0b14",
          50: "rgba(10, 11, 20, 0.5)",
          60: "rgba(10, 11, 20, 0.6)",
          70: "rgba(10, 11, 20, 0.7)",
          80: "rgba(10, 11, 20, 0.8)",
        },
        "cyber-purple": {
          DEFAULT: "#9b87f5",
          20: "rgba(155, 135, 245, 0.2)",
          30: "rgba(155, 135, 245, 0.3)",
          40: "rgba(155, 135, 245, 0.4)",
          50: "rgba(155, 135, 245, 0.5)",
        },
        "cyber-pink": {
          DEFAULT: "#D946EF",
          20: "rgba(217, 70, 239, 0.2)",
          30: "rgba(217, 70, 239, 0.3)",
          40: "rgba(217, 70, 239, 0.4)",
          50: "rgba(217, 70, 239, 0.5)",
          70: "rgba(217, 70, 239, 0.7)",
        },
        "cyber-blue": {
          DEFAULT: "#0EA5E9",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        glitch: {
          "0%": { 
            transform: "translate(0)" 
          },
          "20%": { 
            transform: "translate(-2px, 2px)" 
          },
          "40%": { 
            transform: "translate(-2px, -2px)" 
          },
          "60%": { 
            transform: "translate(2px, 2px)" 
          },
          "80%": { 
            transform: "translate(2px, -2px)" 
          },
          "100%": { 
            transform: "translate(0)" 
          },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glitch": "glitch 1s ease-in-out infinite",
      },
      fontFamily: {
        cyber: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
