// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        karla: ["var(--font-karla)", "sans-serif"],
        "product-sans": ["var(--font-product-sans)", "sans-serif"],
        nexa: ["var(--font-nexa)", "sans-serif"],
        proxima: ["var(--font-proxima)", "sans-serif"],
      },
      keyframes: {
        floatIn: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-100% 0",
          },
          "100%": {
            backgroundPosition: "100% 0",
          },
        },
      },
      animation: {
        floatIn: "floatIn 0.5s ease-out",
        shimmer: "shimmer 1.5s infinite linear",
      },
      borderRadius: {
        arrow: "1rem", // Custom border radius for arrow effect
      },
      boxShadow: {
        arrow: "0 0 0 5px rgba(0,0,0,0.1)", // Custom shadow if needed
      },
      // Custom arrow size and position
      width: {
        "arrow-large": "24px", // Adjust size as needed
      },
      height: {
        "arrow-large": "24px", // Adjust size as needed
      },
      translate: {
        "arrow-left": "-8px", // Move arrow to the left
      },
      colors: {
        purple1: "#4C28BC",
        purple2: "#DCD1FF",
        purple3: "#E08CF7",
        orange: "#FE531F",
        cream: "#FBDABB",
        silver: "#EDEFEE",
        black1: "#333333",
        customBackground: "#F7F5FF",
        customPurple: "#351265",
      },
    },
  },
  plugins: [],
};

export default config;
