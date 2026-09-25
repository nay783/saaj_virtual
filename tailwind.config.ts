import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-manrope)",
          "Manrope",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        saaj: {
          canvas: "#F8FAFC",
          surface: "#FFFFFF",
          card: "rgba(255, 255, 255, 0.90)",
          border: "rgba(15, 23, 42, 0.06)",
          text: "#111827",
          secondary: "#667085",
          subtle: "#98A2B3",
        },
        tonito: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          900: "#1E3A8A",
        },
        manuela: {
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          500: "#F43F5E",
          600: "#E11D48",
          700: "#BE123C",
          900: "#881337",
        },
      },
      borderRadius: {
        sm: "10px",
        md: "14px",
        lg: "18px",
        xl: "24px",
        "2xl": "28px",
        "3xl": "32px",
        pill: "9999px",
      },
      boxShadow: {
        subtle: "0 2px 8px -2px rgba(15, 23, 42, 0.03), 0 1px 3px -1px rgba(15, 23, 42, 0.02)",
        soft: "0 8px 24px -6px rgba(15, 23, 42, 0.04), 0 2px 8px -2px rgba(15, 23, 42, 0.02)",
        elevated: "0 16px 36px -10px rgba(15, 23, 42, 0.07), 0 4px 12px -3px rgba(15, 23, 42, 0.03)",
        "glow-blue": "0 10px 28px -6px rgba(37, 99, 235, 0.16)",
        "glow-pink": "0 10px 28px -6px rgba(225, 29, 72, 0.16)",
        floating: "0 14px 32px -8px rgba(15, 23, 42, 0.08)",
      },
      backdropBlur: {
        xs: "4px",
        glass: "16px",
        heavy: "28px",
      },
    },
  },
  plugins: [],
};

export default config;
