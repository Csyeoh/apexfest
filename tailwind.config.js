/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        surface: '#0f0f1a',
        'text-base': '#e8e4d4',
        'text-muted': 'rgba(232,228,212,0.5)',
        gamefest: '#ffb830',
        techfest: '#00dcc0',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
        body: ['Rajdhani', 'sans-serif'],
      },
      borderWidth: {
        'half': '0.5px',
      },
    },
  },
  plugins: [],
}
