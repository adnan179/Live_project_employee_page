/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mea: ['"Mea Culpa"', 'cursive'], // add a fallback like 'cursive'
      },
    },
  },
  plugins: [],
}