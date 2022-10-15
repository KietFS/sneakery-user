/** @type {import('tailwindcss').Config} */

const screens = {
  phone: "600px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1270px",
  television: "1600px",
};

const colors = {
  orange: {
    50: "#fff5ed",
    100: "#ffe9d4",
    200: "#ffcea8",
    300: "#ffac70",
    400: "#ff7d37",
    500: "#ff5f17",
    600: "#f03f06",
    700: "#c72c07",
    800: "#9e240e",
    900: "#7f210f",
  },
  primary: {
    50: "#ff9149",
    100: "#ff873f",
    200: "#ff7d35",
    300: "#ff732b",
    400: "#ff6921",
    500: "#ff5f17",
    600: "#f5550d",
    700: "#eb4b03",
    800: "#e14100",
    900: "#d73700",
  },
  secondary: {
    50: "#575757",
    100: "#4d4d4d",
    200: "#434343",
    300: "#393939",
    400: "#2f2f2f",
    500: "#252525",
    600: "#1b1b1b",
    700: "#111111",
    800: "#070707",
    900: "#000000",
  },
};

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens,
      colors: colors,
    },
  },
  plugins: [require("flowbite/plugin")],
};
