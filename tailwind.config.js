/** @type {import('tailwindcss').Config} */
module.exports = {
  // Archivos donde Tailwind busca las clases para generar sólo el CSS usado.
  content: ['./index.html', './404.html', './src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B2E59',
          deep: '#071B33',
          ink: '#0A1A2E',
        },
        gold: {
          DEFAULT: '#C2A158',
          bright: '#E4C27A',
          deep: '#9C7C38',
        },
        board: {
          DEFAULT: '#F3EFE6',
          dark: '#E8E1D2',
        },
        paper: '#FBF8F0',
        kraft: '#DCCFB6',
        ink: '#14202E',
        rule: '#D8D0BF',
        alert: '#A6402C',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Oswald', 'Arial Narrow', 'sans-serif'],
        sans: ['Barlow', 'system-ui', 'Segoe UI', 'sans-serif'],
        mono: ['"Azeret Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
      boxShadow: {
        sheet: '0 1px 0 rgba(255,255,255,.75) inset, 0 2px 0 rgba(7,27,51,.04), 0 28px 60px -34px rgba(7,27,51,.55)',
        magnet: '0 1px 0 rgba(255,255,255,.35) inset, 0 2px 0 rgba(7,27,51,.16), 0 14px 26px -16px rgba(7,27,51,.6)',
        lift: '0 18px 40px -18px rgba(7,27,51,.55)',
      },
      maxWidth: {
        board: '1240px',
        measure: '62ch',
      },
    },
  },
  plugins: [],
};
