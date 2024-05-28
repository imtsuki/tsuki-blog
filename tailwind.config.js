import { fontFamily } from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
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
      fontFamily: {
        serif: ['var(--font-noto-serif-sc)', ...fontFamily.serif],
        mono: ['var(--font-fira-code)', ...fontFamily.mono],
      },
      maxWidth: {
        prose: '640px',
      },
      boxShadow: {
        highlight: 'inset 0 -.5em 0 0',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: theme('maxWidth.prose'),
          },
        },
        zinc: {
          css: {
            '--tw-prose-pre-bg': theme('colors.zinc.100'),
            '--tw-prose-invert-pre-bg': theme('colors.zinc.800 / 50%'),
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
