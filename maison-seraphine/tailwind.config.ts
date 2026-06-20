import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "var(--c-bone)",
        cream: "var(--c-cream)",
        espresso: "var(--c-espresso)",
        cocoa: "var(--c-cocoa)",
        gold: "var(--c-gold)",
        "gold-light": "var(--c-gold-light)",
        rose: "var(--c-rose)",
        mauve: "var(--c-mauve)",
        ink: "var(--c-ink)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid oversized display scale (used as a design element).
        "display-sm": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "0.92" }],
        "display-md": ["clamp(3.25rem, 9vw, 8rem)", { lineHeight: "0.88" }],
        "display-lg": ["clamp(4rem, 16vw, 17rem)", { lineHeight: "0.82" }],
        "display-xl": ["clamp(5rem, 22vw, 26rem)", { lineHeight: "0.78" }],
      },
      letterSpacing: {
        widest2: "0.32em",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
