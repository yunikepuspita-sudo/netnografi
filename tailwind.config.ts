import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcdaff",
          300: "#8ec3ff",
          400: "#59a1ff",
          500: "#327dff",
          600: "#1a5cf5",
          700: "#1448e1",
          800: "#173cb6",
          900: "#19388f",
          950: "#142357",
        },
        ink: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d4d9e2",
          300: "#aeb7c8",
          400: "#8290a8",
          500: "#63728d",
          600: "#4e5a74",
          700: "#40495f",
          800: "#373e50",
          900: "#1f2433",
          950: "#13161f",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
