/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"M PLUS Rounded 1c"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        wide: '0.04em',
      },
      lineHeight: {
        relaxed: '1.8',
      },
    },
  },
  plugins: [],
};
