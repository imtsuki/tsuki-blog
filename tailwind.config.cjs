/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blurple: 'rgb(82 0 255)',
        franklin: 'rgb(60 255 208)',
        pernod: 'rgb(214 243 31)',
        hotbrick: 'rgb(255 61 0)',
        pep: 'rgb(255,194,231)',
      },
      boxShadow: {
        highlight: 'inset 0 -.5em 0 0',
      },
      maxWidth: {
        prose: '75ch',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '75ch',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
