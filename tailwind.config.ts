import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "n-dark": {
          extend: "dark", // Start with the default dark theme
          colors: {
            background: "#000000", // Dark background
            foreground: "#ffffff", // Text color
            primary: {
              50: "#3B096C",
              100: "#520F83",
              200: "#7318A2",
              300: "#9823C2",
              400: "#c031e2",
              500: "#DD62ED",
              600: "#F182F6",
              700: "#FCADF9",
              800: "#FDD5F9",
              900: "#FEECFE",
              DEFAULT: "#DD62ED",
              foreground: "#ffffff",
            },
            secondary: {
              50: "#1A1A1A",
              100: "#2A2A2A",
              200: "#3A3A3A",
              300: "#4A4A4A",
              400: "#5A5A5A",
              500: "#6A6A6A",
              600: "#7A7A7A",
              700: "#8A8A8A",
              800: "#9A9A9A",
              900: "#AAAAAA",
              DEFAULT: "#6A6A6A",
            },
            // Additional color customizations can be added here
          },
        },
      },
      defaultTheme: "n-dark", // This line sets n-dark as the default theme
    }),
  ],
};

export default config;
