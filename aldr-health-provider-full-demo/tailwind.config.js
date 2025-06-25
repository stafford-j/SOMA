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
          primary: '#10B981',  // Emerald-500
          secondary: '#0F766E', // Teal-700
          accent: '#3B82F6',   // Blue-500
          dark: '#1F2937',     // Gray-800
          light: '#F9FAFB',    // Gray-50
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};