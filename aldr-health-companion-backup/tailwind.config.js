/** @type {import('tailwindcss').Config} */
module.exports = {
  // 👇 This tells Tailwind to scan all your React files for class names
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Look inside /src and all subfolders
  ],
  theme: {
    extend: {}, // You can customize your theme here later
  },
  plugins: [], // Add Tailwind plugins here if needed (e.g. forms, typography)
};
