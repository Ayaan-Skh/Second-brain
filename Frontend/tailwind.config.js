/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        yellow:{
          100:"#f5f5dc",
          200:"#d2b48c",
          400:"#8b4513",
          600:"#5d3a1a"
        }
      }
    },
  },
  plugins: [],
}