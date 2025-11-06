/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        '3pl-blue': '#0B3B8F',
        '3pl-blue-light': '#EAF2FF'
      }
    }
  },
  plugins: [],
};
