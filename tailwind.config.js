const { createThemes } = require("tw-colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    createThemes({
      dark: {
        backgroundPrimary: "#202123",
        backgroundPrimaryDark: "#171718",
        backgroundPrimaryDarker: "#0f0f0f",
        foregroundPrimary: "white",
      },
      light: {
        backgroundPrimary: "white",
        backgroundPrimaryDark: "#f0f0f0",
        backgroundPrimaryDarker: "#bebebe",
        foregroundPrimary: "#333",
      },
    }),
  ],
};
