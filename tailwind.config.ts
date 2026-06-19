import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#070710", soft: "#0c0c18", card: "#11111f" },
        neon: { cyan: "#22d3ee", violet: "#8b5cf6", fuchsia: "#e879f9", mint: "#34d399" },
        salon: {
          bone:      "#F5F0E8",
          cream:     "#EDE8DF",
          ivory:     "#FAF7F2",
          espresso:  "#1E120A",
          taupe:     "#7A6858",
          terracotta:"#B8714E",
          brass:     "#C4A46A",
          sage:      "#8A9B8E",
          sand:      "#D4C5B0",
        },
      },
      fontFamily: {
        sans:     ["var(--font-inter)",    "system-ui", "sans-serif"],
        display:  ["var(--font-display)",  "system-ui", "sans-serif"],
        fraunces: ["var(--font-fraunces)", "Georgia",   "serif"],
        dm:       ["var(--font-dm-sans)",  "system-ui", "sans-serif"],
      },
      animation: {
        "blob-slow":     "blob 22s ease-in-out infinite",
        "blob-med":      "blob 16s ease-in-out infinite",
        "spin-slow":     "spin 14s linear infinite",
        "marquee":       "marquee 32s linear infinite",
        "gradient-x":    "gradient-x 6s ease infinite",
        "marquee-salon": "marquee-salon 38s linear infinite",
        "zoom-slow":     "zoom-slow 24s ease-in-out infinite alternate",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%":      { transform: "translate(40px, -60px) scale(1.1)" },
          "66%":      { transform: "translate(-30px, 40px) scale(0.95)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        "marquee-salon": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "zoom-slow": {
          "0%":   { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
