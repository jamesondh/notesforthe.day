/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundPrimary: "#202123",
        backgroundPrimaryDark: "#171718",
        backgroundPrimaryDarker: "#0f0f0f",
      },
    },
  },
  plugins: [],
};
