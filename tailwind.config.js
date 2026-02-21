/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Un rosa neón potente
        'floyd-pink': '#ff00ff', 
        // Un negro no absoluto para suavizar (opcional, o usa black directo)
        'floyd-dark': '#050505',
      },
      dropShadow: {
        // El secreto del neón: múltiples capas de sombra
        'neon': [
          '0 0 5px #ff00ff',
          '0 0 20px #ff00ff',
          '0 0 40px #ff00ff', 
        ]
      },
      fontFamily: {
        // Puedes importar una fuente tipo "Montserrat" o "Orbitron" en tu index.css
        sans: ['Inter', 'sans-serif'], 
      },
      animation: {
        'flicker': 'flicker 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' },
        }
      }
    },
  },
  plugins: [],
}