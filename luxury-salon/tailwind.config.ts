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
        obsidian: "#0a0a0a",
        charcoal: "#111111",
        "charcoal-mid": "#1a1a1a",
        "charcoal-light": "#2a2a2a",
        brass: "#b8952a",
        "brass-light": "#d4af5a",
        "brass-pale": "#e8d08a",
        copper: "#c47a3a",
        leather: "#5c3a1e",
        tobacco: "#3d2010",
        oxblood: "#6b1a1a",
        steel: "#8a9299",
        "steel-light": "#b0b8bf",
        cream: "#f5f0e8",
        "warm-white": "#faf8f5",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        "ultra-wide": "0.3em",
        "brand": "0.15em",
      },
      lineHeight: {
        "tight-display": "0.9",
        "display": "1.0",
      },
    },
  },
  plugins: [],
};

export default config;
