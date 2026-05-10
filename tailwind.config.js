/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#081120',
        surface: '#0b0e17',
        'text-base': '#d7fdff',
        'text-muted': 'rgba(215,253,255,0.5)',
        gamefest: '#ff007f',
        'gamefest-secondary': '#be6bff',
        techfest: '#46f4ff',
        accent: '#44a5ff',
      },
      fontFamily: {
        display: ['Oxanium', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
        ui: ['Rajdhani', 'sans-serif'],
      },
      borderWidth: {
        'half': '0.5px',
      },
    },
  },
  plugins: [],
}
