const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      keyframes: {
        slidedown: {
          '0%': { height: '0' },
          '100%': { height: 'full' }
        },
      },
      animation: {
        slidedown: 'slidedown 1s ease-in-out'
      },
      backgroundImage: {
        'circuit-bg': path.resolve(__dirname, './public/circuit-board.png'),
      }
    },
  },
  plugins: [],
}
