import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saaj: {
          canvas: "#F6F8FC",
          surface: "#FFFFFF",
          "surface-glass": "rgba(255, 255, 255, 0.82)",
          border: "rgba(226, 232, 240, 0.7)",
          text: "#0F172A",
          muted: "#64748B",
          subtle: "#94A3B8",
          dark: "#090D16",
        },
        tonito: {
          50: "#F0F6FF",
          100: "#E0ECFF",
          200: "#C2D9FF",
          500: "#0066FF",
          600: "#0052CC",
          700: "#003D99",
          900: "#0F2942",
        },
        manuela: {
          50: "#FFF0F4",
          100: "#FFE0E9",
          200: "#FCD0DC",
          500: "#D93868",
          600: "#B82350",
          700: "#94183E",
          900: "#3D0C19",
        },
      },
      borderRadius: {
        "4xl": "2rem", // 32px
        "5xl": "2.5rem", // 40px
      },
      boxShadow: {
        soft: "0 10px 30px -5px rgba(15, 23, 42, 0.03), 0 4px 12px -2px rgba(15, 23, 42, 0.02)",
        elevated: "0 20px 40px -12px rgba(15, 23, 42, 0.07), 0 6px 16px -4px rgba(15, 23, 42, 0.03)",
        glass: "0 12px 40px -10px rgba(0, 0, 0, 0.06), 0 2px 10px -2px rgba(0, 0, 0, 0.03)",
        "glow-blue": "0 12px 35px -8px rgba(0, 102, 255, 0.22)",
        "glow-pink": "0 12px 35px -8px rgba(217, 56, 104, 0.22)",
        floating: "0 16px 36px -8px rgba(15, 23, 42, 0.12)",
      },
      backdropBlur: {
        xs: "4px",
        glass: "20px",
        heavy: "32px",
      },
    },
  },
  plugins: [],
};

export default config;
