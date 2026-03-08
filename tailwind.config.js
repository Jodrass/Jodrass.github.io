/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',    // móvil extra pequeño / clásico
      'sm': '510px',    // móvil pequeño
      'md': '767px',    // Tablet o móvil grande
      'lg': '990px',    // ordenador pantalla pequeña
      'xl': '1920px',   // ordenador FULL HD
    },
    extend: {
      colors: {
        primary: '#fb6f92',
        secondary: '#ffe5ec',
        accent: '#ffb3c6',
        dark: '#1e1e24',
        light: '#f8f9fa'
      }
    },
  },
  plugins: [],
}
