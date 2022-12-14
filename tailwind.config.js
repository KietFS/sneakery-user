/** @type {import('tailwindcss').Config} */

const screens = {
  phone: "600px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1270px",
  television: "1600px",
};

const colors = {
  black: {
    500: "#171717",
  },
  denim: {
    500: "#6F8FAF",
  },
  cream: {
    500: "#FFFDD0",
  },
  brown: {
    500: "#964B00",
  },
  silver: {
    500: "#C0C0C0",
  },
};

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./designs/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens,
      colors: colors,
    },
  },
  plugins: [require("flowbite/plugin")],
};
