/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          background: '#ffffff',
          text: '#000000',
          primary: '#1a202c',
          secondary: '#2d3748',
        },
        dark: {
          background: '#1a202c',
          text: '#ffffff',
          primary: '#2d3748',
          secondary: '#4a5568',
        },
      },
    },
  },
  plugins: [],
}

