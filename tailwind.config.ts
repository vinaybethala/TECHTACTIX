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
        background: "var(--background)",
        foreground: "var(--foreground)",
        cyan: {
          500: "#06b6d4",
          400: "#22d3ee",
        },
        navy: {
          950: "#01030d",
          900: "#020617",
          800: "#0f172a",
        }
      },
      fontFamily: {
        heading: ["var(--font-orbitron)"],
        sans: ["var(--font-inter)"],
      }
    },
  },
  plugins: [],
};
export default config;
