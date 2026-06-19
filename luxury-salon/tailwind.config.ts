import type { Config } from "tailwindcss";

/**
 * Maison Dorée — design tokens.
 * "Quiet opulence": warm champagne/bone base, deep espresso & cocoa,
 * brushed gold/brass accents, whispers of dusty rose & mauve.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm bone / champagne canvas
        bone: {
          DEFAULT: "#F4EEE3",
          50: "#FBF8F2",
          100: "#F4EEE3",
          200: "#E8DECB",
        },
        champagne: "#E7D3B3",
        // Deep espresso / cocoa for ink + dark sections
        espresso: {
          DEFAULT: "#1A1410",
          soft: "#241B14",
          800: "#2E231A",
          700: "#3A2C20",
        },
        cocoa: "#5B4636",
        // Brushed gold / brass accent system
        gold: {
          DEFAULT: "#C9A24B",
          light: "#E4C77E",
          bright: "#F0DCA0",
          deep: "#9A7B33",
          brass: "#B08D57",
        },
        // Whispers
        rose: "#C9A1A0",
        mauve: "#A88BA0",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-grotesk)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.06em",
        luxe: "0.18em",
        widest2: "0.32em",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
        "luxe-in-out": "cubic-bezier(0.65, 0.05, 0.36, 1)",
      },
      animation: {
        "grain-shift": "grain 8s steps(10) infinite",
        marquee: "marquee 38s linear infinite",
        shimmer: "shimmer 4.5s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-4%, -4%)" },
          "30%": { transform: "translate(3%, -2%)" },
          "50%": { transform: "translate(-2%, 3%)" },
          "70%": { transform: "translate(4%, 2%)" },
          "90%": { transform: "translate(-3%, 4%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
