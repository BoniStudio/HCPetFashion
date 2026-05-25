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
        cream: "#F7F4EF",
        ivory: "#FAF8F5",
        sand: "#E8E2D8",
        khaki: "#D4C9B8",
        stone: "#9A948A",
        charcoal: "#3D3A36",
        espresso: "#5C4F42",
        warm: "#6B6358",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      boxShadow: {
        editorial: "0 24px 80px -20px rgba(61, 58, 54, 0.18)",
        soft: "0 8px 32px -8px rgba(61, 58, 54, 0.12)",
        hover: "0 20px 60px -15px rgba(61, 58, 54, 0.22)",
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
