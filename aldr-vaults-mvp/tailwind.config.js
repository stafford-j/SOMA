/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        aldr: {
          teal: '#20B2AA',    // Main accent color
          purple: '#8A2BE2',   // Secondary accent
          dark: '#333333',     // Main text
          light: '#F8F9FA',    // Backgrounds
          gray: '#6C757D',     // Secondary text, muted UI
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      backgroundImage: {
        'aldr-gradient': 'linear-gradient(45deg, #20B2AA, #8A2BE2)',
      },
      borderRadius: {
        'pill': '50px',
      },
    },
  },
  plugins: [],
};