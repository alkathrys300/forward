import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F7F2E7",
          soft: "#FBF8F0",
          deep: "#EFE7D4",
        },
        navy: {
          DEFAULT: "#14282F",
          deep: "#0D1C21",
          light: "#22414A",
        },
        teal: {
          DEFAULT: "#1F6B67",
          deep: "#154B48",
          light: "#3E8C86",
          mint: "#DEEEE7",
        },
        sun: {
          DEFAULT: "#EFA45C",
          light: "#F7CB94",
          deep: "#D9822F",
        },
        ink: {
          DEFAULT: "#182A2E",
          soft: "#4C6066",
          faint: "#8397A0",
        },
      },
      fontFamily: {
        arabic: ["var(--font-plex-arabic)", "Tahoma", "sans-serif"],
      },
      maxWidth: {
        content: "1400px",
      },
      borderRadius: {
        xl2: "1.75rem",
        "3xl": "2rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "drift": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "draw": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        drift: "drift 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
