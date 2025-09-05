/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        brand: {
          purple: '#764ba2',
          pink: '#f093fb',
        }
      },
      boxShadow: {
        glass: '0 8px 32px rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
};
