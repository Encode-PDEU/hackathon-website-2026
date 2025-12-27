import type { Config } from "tailwindcss";
import fs from "fs";
import path from "path";

// Minecraft image directories
const BLOCK_DIR = "imgs/blocks";
const ITEM_DIR = "imgs/items";
const PAINTING_DIR = "imgs/paintings";
const BLOCK_SPACING_MAX = 99;

const background_obj: Record<string, string> = {};
const spacing_obj: Record<string, string> = {};

// Helper to safely read directories
const safeReadDir = (dirPath: string): string[] => {
  try {
    return fs.readdirSync(path.join(process.cwd(), "public", dirPath));
  } catch (e) {
    console.warn(`Could not read directory: public/${dirPath}`);
    return [];
  }
};

// 1. Generate Block Backgrounds (e.g., 'bg-block-stone')
safeReadDir(BLOCK_DIR).forEach((file) => {
  if (file.startsWith(".")) return;
  const name = `block-${file.split(".")[0]}`;
  background_obj[name] = `url('/${BLOCK_DIR}/${file}')`;
});

// 2. Generate Item Backgrounds (e.g., 'bg-item-diamond')
safeReadDir(ITEM_DIR).forEach((file) => {
  if (file.startsWith(".")) return;
  const name = `item-${file.split(".")[0]}`;
  background_obj[name] = `url('/${ITEM_DIR}/${file}')`;
});

// 3. Generate Painting Backgrounds
safeReadDir(PAINTING_DIR).forEach((file) => {
  if (file.startsWith(".")) return;
  const name = `painting-${file.split(".")[0]}`;
  background_obj[name] = `url('/${PAINTING_DIR}/${file}')`;
});

// 4. Generate Spacings (e.g., 'h-1-block', 'w-4-block')
Array.from({ length: BLOCK_SPACING_MAX }, (_, i) => i + 1).forEach((i) => {
  spacing_obj[`${i}-block`] = `calc(var(--block-size) * ${i})`;
});

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        retro: ['VT323', 'monospace'],
        body: ['"Silkscreen"', 'cursive'],
        minecraft: ['Minecraft', 'Arial', 'sans-serif'],
        minecrafter: ['Minecrafter', 'Minecraft', 'Arial', 'sans-serif'],
        mono: ['Monocraft', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        "border-light": "hsl(var(--border-light))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
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
        gold: {
          DEFAULT: "hsl(var(--gold))",
          foreground: "hsl(var(--gold-foreground))",
        },
        creeper: "hsl(var(--creeper))",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        mc: {
          grass: "#4CAF50",
          dirt: "#8D6E63",
          stone: "#1F1F1F",
          diamond: "#4EE6D6",
          night: "#0B0E1A",
          bg: "#050505",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        sign: "url('/imgs/ui/sign.png')",
        ...background_obj, // Injects generated block, item, and painting classes
      },
      spacing: {
        "1/16-block": "calc(var(--block-size) / 16)",
        "1/8-block": "calc(var(--block-size) / 8)",
        "1/2-block": "calc(var(--block-size) / 2)",
        ...spacing_obj, // Injects generated block spacing (1-block to 99-block)
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
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(-3deg)" },
        },
        "block-place": {
          "0%": { transform: "scale(0) rotate(-10deg)", opacity: "0" },
          "50%": { transform: "scale(1.2) rotate(5deg)" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        "pixel-fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float-delayed 5s ease-in-out infinite 1s",
        "block-place": "block-place 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "pixel-fade-in": "pixel-fade-in 0.5s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s ease-in-out infinite",
        bounce: "bounce 1s ease-in-out infinite",
      },
      boxShadow: {
        pixel: "4px 4px 0px 0px hsl(0 0% 0% / 0.5)",
        "pixel-sm": "2px 2px 0px 0px hsl(0 0% 0% / 0.5)",
        glow: "0 0 20px hsl(var(--primary-glow) / 0.4)",
        "glow-gold": "0 0 20px hsl(var(--gold) / 0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
