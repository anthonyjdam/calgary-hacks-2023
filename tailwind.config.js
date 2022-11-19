/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter', 'serif']
      }, 
      colors: {
        'lavendar': '#D3D5FD',
        'darkgrey': '#474A56',
        'lightgrey': '#929AAB'
      },
    },
  },
  plugins: [],
}
