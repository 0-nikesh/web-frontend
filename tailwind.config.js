const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust paths based on your project structure
  darkMode: 'class', // Enables dark mode via the 'class' strategy
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#003D93", // Your logo color (primary button color)
          light: "#0050B5", // Slightly lighter for hover effects (optional)
        },
        background: {
          DEFAULT: "#EAF1F8", // Background color
        },
        card: {
          DEFAULT: "#FFFFFF", // Card background color (pure white)
        },
        accent: {
          DEFAULT: "#DB133C", // Secondary logo color (can be used for accents)
        },
      },
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"], // Use Source Sans Pro as default
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
