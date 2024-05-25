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
      colors: {
        purple1: "#4C28BC",
        purple2: "#DCD1FF",
        purple3: "#E08CF7",
        orange: "#FE531F",
        cream: "#FBDABB",
        silver: "#EDEFEE",
        black1: "#333333",
        customBackground: "#F7F5FF", 
      },
    },
  },
  plugins: [],
};

export default config;
