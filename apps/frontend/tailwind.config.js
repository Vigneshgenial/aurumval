/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fefcf0',
          100: '#fef9e7',
          200: '#fef0cc',
          300: '#fde8b2',
          400: '#fcd683',
          500: '#fbc429',
          600: '#e5b024',
          700: '#c48f1a',
          800: '#a46d14',
          900: '#8b540f',
        },
      },
    },
  },
  plugins: [],
};
