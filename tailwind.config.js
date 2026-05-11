/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f8f9fa',
        surface: '#ffffff',
        'text-base': '#1a1a2e',
        'text-muted': 'rgba(26,26,46,0.5)',
        gamefest: '#ff007f',
        'gamefest-secondary': '#be6bff',
        techfest: '#00b4d8',
        accent: '#44a5ff',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
        ui: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '24px',
      },
    },
  },
  plugins: [],
}
