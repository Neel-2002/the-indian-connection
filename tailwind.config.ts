import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF6EC",
        // Primary — heritage maroon
        maroon: {
          50: "#F6E7E8",
          700: "#8E1F2F",
          900: "#681321",
        },
        // Secondary — deep navy (from the logo emblem)
        navy: {
          50: "#E7EEF5",
          700: "#174F72",
          900: "#002766",
        },
        // Accent — traditional saffron / rust (the logo's key & flourishes)
        saffron: {
          DEFAULT: "#C24E12",
          soft: "#E8A765",
        },
        ink: "#2A1418",
        muted: "#6E5A55",
        line: "#E7DAC6",
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -18px rgba(104,19,33,0.28)",
        lift: "0 24px 50px -24px rgba(0,39,102,0.40)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "line-in": {
          "0%": { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.8s ease-out both",
        "line-in": "line-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
