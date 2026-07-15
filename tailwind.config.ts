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
        rakshak: {
          bg: "#FAFAFA",
          surface: "#F5F5F5",
          cyan: "#00E5FF",
          danger: "#FF3B30",
          success: "#00FF87",
          gold: "#FFD700",
          text: "#111111",
          muted: "#888888",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(0,229,255,0.3)",
        "glow-lg": "0 0 25px rgba(0,229,255,0.4)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        bounce: "bounce 2s infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
