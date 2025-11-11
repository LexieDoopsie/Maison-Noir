import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          50: "#1a1a1a",
          100: "#0f0f0f",
          200: "#1e1e1e",
          300: "#2d2d2d",
          400: "#3c3c3c",
          500: "#4a4a4a",
        },
        gold: {
          400: "#d4af37",
          500: "#c9a227",
          600: "#b8941f",
        },
        violet: {
          800: "#4c1d95",
          900: "#3b1a6b",
        },
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "glow": "glow 2s ease-in-out infinite alternate",
        "smoke": "smoke 20s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(212, 175, 55, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.8)" },
        },
        smoke: {
          "0%": { transform: "translateY(0) translateX(0)" },
          "33%": { transform: "translateY(-20px) translateX(10px)" },
          "66%": { transform: "translateY(-10px) translateX(-10px)" },
          "100%": { transform: "translateY(0) translateX(0)" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;

