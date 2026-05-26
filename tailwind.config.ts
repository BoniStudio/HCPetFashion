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
        ivory: "#F4F1EC",
        "ivory-warm": "#F4F1EC",
        ink: "#111111",
        graphite: "#2C2C2C",
        silver: "#D8D1C6",
        mist: "#DDE8EA",
        accent: "#C8E0B8",
        "accent-cyan": "#B8D4E0",
        muted: "#6B6560",
        cream: "#F4F1EC",
        charcoal: "#2C2C2C",
        stone: "#6B6560",
        warm: "#6B6560",
        sand: "#D8D1C6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(200, 224, 184, 0.45)",
        "glow-sm": "0 0 24px -6px rgba(200, 224, 184, 0.35)",
        editorial: "0 24px 80px -20px rgba(17, 17, 17, 0.12)",
        soft: "0 8px 32px -8px rgba(17, 17, 17, 0.08)",
        hover: "0 20px 60px -15px rgba(17, 17, 17, 0.14)",
      },
      animation: {
        "fade-in": "fadeIn 1s ease forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
