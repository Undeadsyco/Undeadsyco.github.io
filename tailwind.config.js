const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'circuit-bg': path.resolve(__dirname, './public/circuit-board.png'),
      }
    },
  },
  plugins: [],
}
