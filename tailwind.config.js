/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: "#202f11",
        background: "#ffffff",
        lightBg: "#f2f3ef",
        darkBg: "#3A3A3A",
        primary: "#606c38",
        secondary: "#fefae0",
        accent: "#ae7e2d",
        leafSecondary: "#607c48",
        red: "#a23b3b",
        orange: "#cc7a00"
      },
      borderWidth: {
        200: "200px",
      },
    },
  },
  plugins: [],
};
