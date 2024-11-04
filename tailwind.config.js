/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: '#e1572f',
        brown: '#6d3d1a'
      },
      backgroundImage: {
        "header": "url('assets/header.png')"
      }
    }
  },
  plugins: [],
}