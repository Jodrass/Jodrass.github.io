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
        primary: '#7c3aed',
        secondary: '#f3e8ff',
        accent: '#a855f7',
        dark: '#1e1b2e',
        light: '#faf5ff'
      }
    },
  },
  plugins: [],
}
