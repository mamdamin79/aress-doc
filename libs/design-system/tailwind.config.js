const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      keyframes: {
        toast: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        moveCircle: {
          '0%': { cx: '12.9564', cy: '13.3321' },
          '100%': { cx: '20.0', cy: '20.0' },
        },
        mm: {
          from: {
            d: 'path("M22.2098 25.0924L18.1414 9.9087C17.8605 8.86049 16.7831 8.23843 15.7349 8.5193L8.14302 10.5535C7.0948 10.8344 6.47274 11.9118 6.75361 12.96L10.8221 28.1437C11.1029 29.1919 12.1804 29.814 13.2286 29.5331L20.8204 27.4989C21.8686 27.218 22.4907 26.1406 22.2098 25.0924Z")',
          },
          to: {
            d: 'path("M22.607 18.8539L18.4659 3.39914C18.18 2.3322 17.0833 1.69904 16.0164 1.98492L8.28898 4.05548C7.22205 4.34136 6.58889 5.43803 6.87477 6.50497L11.0159 21.9598C11.3018 23.0267 12.3984 23.6599 13.4654 23.374L21.1928 21.3034C22.2597 21.0176 22.8929 19.9209 22.607 18.8539Z")',
          },
        },
        dd: {
          from: {
            d: 'path("M12.5837 19.5347C12.8646 20.5829 13.942 21.205 14.9902 20.9241C16.0385 20.6432 16.6605 19.5658 16.3797 18.5176C16.0988 17.4694 15.0213 16.8473 13.9731 17.1282C12.9249 17.4091 12.3029 18.4865 12.5837 19.5347Z")',
          },
          to: {
            d: 'path("M12.8092 13.1971C13.0951 14.264 14.1918 14.8972 15.2587 14.6113C16.3256 14.3254 16.9588 13.2288 16.6729 12.1618C16.387 11.0949 15.2904 10.4617 14.2234 10.7476C13.1565 11.0335 12.5233 12.1302 12.8092 13.1971Z")',
          },
        },
      },
      animation: {
        toast: 'toast 0.3s ease-in-out',
        moveCircle: 'moveCircle 1s ease-in-out forwards',
        mm: 'mm 1s ease-in-out forwards',
        dd: 'dd 1s ease-in-out forwards',
      },
      fontFamily: {
        vazirmatn: 'vazirmatn',
      },
      boxShadow: {
        xs: '0px 1px 1px 0px rgba(0, 11, 23, 0.06)',
        sm: '0px 3px 4px 0px rgba(0, 11, 23, 0.04)',
        md: '0px 2px 8px 0px rgba(0, 11, 23, 0.04)',
        lg: '0px 1px 100px 0px rgba(0, 11, 23, 0.06)',
        xl: '0px 0.8px 0.5px 0px rgba(0, 11, 23, 0.34)',
        '2xl': '1px 3px 4px 0px rgba(0, 11, 23, 0.12)',
        '3xl': '0px 4px 8px 0px rgba(0, 11, 23, 0.09)',
        '4xl': '1px 2px 4.5px 0px rgba(0, 11, 23, 0.24)',
        '5xl': '0px 4px 8px 0px rgba(0, 11, 23, 0.2)',
        '6xl': '4px 4px 1.5px 0px rgba(0, 11, 23, 0.16)',
        '7xl': '8px 8px 2px 0px rgba(0, 11, 23, 0.16)',
        '8xl': '12px 12px 2px 0px rgba(0, 11, 23, 0.16)',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '10px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
        '5xl': '28px',
        '6xl': '32px ',
      },
      fontSize: {
        xs: [
          '12px',
          {
            lineHeight: '22px',
          },
        ],
        sm: [
          '14px',
          {
            lineHeight: '26px',
          },
        ],
        md: [
          '16px',
          {
            lineHeight: '30px',
          },
        ],
        lg: [
          '18px',
          {
            lineHeight: '32px',
          },
        ],
        xl: [
          '20px',
          {
            lineHeight: '36px',
          },
        ],
        '2xl': [
          '22px',
          {
            lineHeight: '38px',
          },
        ],
        '3xl': [
          '24px',
          {
            lineHeight: '40px',
          },
        ],
      },
      colors: {
        brand: {
          50: 'rgb(var(--color-brand-050))',
          100: 'rgb(var(--color-brand-100))',
          200: 'rgb(var(--color-brand-200))',
          300: 'rgb(var(--color-brand-300))',
          400: 'rgb(var(--color-brand-400))',
          500: 'rgb(var(--color-brand-500))',
          600: 'rgb(var(--color-brand-600))',
          700: 'rgb(var(--color-brand-700))',
          800: 'rgb(var(--color-brand-800))',
          900: 'rgb(var(--color-brand-900))',
          1000: 'rgb(var(--color-brand-1000))',
        },
        gray: {
          50: 'rgb(var(--color-gray-050))',
          100: 'rgb(var(--color-gray-100))',
          200: 'rgb(var(--color-gray-200))',
          300: 'rgb(var(--color-gray-300))',
          400: 'rgb(var(--color-gray-400))',
          500: 'rgb(var(--color-gray-500))',
          600: 'rgb(var(--color-gray-600))',
          700: 'rgb(var(--color-gray-700))',
          800: 'rgb(var(--color-gray-800))',
          900: 'rgb(var(--color-gray-900))',
          1000: 'rgb(var(--color-gray-1000))',
        },
        green: {
          50: 'rgb(var(--color-green-050))',
          100: 'rgb(var(--color-green-100))',
          200: 'rgb(var(--color-green-200))',
          300: 'rgb(var(--color-green-300))',
          400: 'rgb(var(--color-green-400))',
          500: 'rgb(var(--color-green-500))',
          600: 'rgb(var(--color-green-600))',
          700: 'rgb(var(--color-green-700))',
          800: 'rgb(var(--color-green-800))',
          900: 'rgb(var(--color-green-900))',
          1000: 'rgb(var(--color-green-1000))',
        },
        blue: {
          50: 'rgb(var(--color-blue-050))',
          100: 'rgb(var(--color-blue-100))',
          200: 'rgb(var(--color-blue-200))',
          300: 'rgb(var(--color-blue-300))',
          400: 'rgb(var(--color-blue-400))',
          500: 'rgb(var(--color-blue-500))',
          600: 'rgb(var(--color-blue-600))',
          700: 'rgb(var(--color-blue-700))',
          800: 'rgb(var(--color-blue-800))',
          900: 'rgb(var(--color-blue-900))',
          1000: 'rgb(var(--color-blue-1000))',
        },
        yellow: {
          50: 'rgb(var(--color-yellow-050))',
          100: 'rgb(var(--color-yellow-100))',
          200: 'rgb(var(--color-yellow-200))',
          300: 'rgb(var(--color-yellow-300))',
          400: 'rgb(var(--color-yellow-400))',
          500: 'rgb(var(--color-yellow-500))',
          600: 'rgb(var(--color-yellow-600))',
          700: 'rgb(var(--color-yellow-700))',
          800: 'rgb(var(--color-yellow-800))',
          900: 'rgb(var(--color-yellow-900))',
          1000: 'rgb(var(--color-yellow-1000))',
        },
        red: {
          50: 'rgb(var(--color-red-050))',
          100: 'rgb(var(--color-red-100))',
          200: 'rgb(var(--color-red-200))',
          300: 'rgb(var(--color-red-300))',
          400: 'rgb(var(--color-red-400))',
          500: 'rgb(var(--color-red-500))',
          600: 'rgb(var(--color-red-600))',
          700: 'rgb(var(--color-red-700))',
          800: 'rgb(var(--color-red-800))',
          900: 'rgb(var(--color-red-900))',
          1000: 'rgb(var(--color-red-1000))',
        },
        pink: {
          50: 'rgb(var(--color-pink-050))',
          100: 'rgb(var(--color-pink-100))',
          200: 'rgb(var(--color-pink-200))',
          300: 'rgb(var(--color-pink-300))',
          400: 'rgb(var(--color-pink-400))',
          500: 'rgb(var(--color-pink-500))',
          600: 'rgb(var(--color-pink-600))',
          700: 'rgb(var(--color-pink-700))',
          800: 'rgb(var(--color-pink-800))',
          900: 'rgb(var(--color-pink-900))',
          1000: 'rgb(var(--color-pink-1000))',
        },
        purple: {
          50: 'rgb(var(--color-purple-050))',
          100: 'rgb(var(--color-purple-100))',
          200: 'rgb(var(--color-purple-200))',
          300: 'rgb(var(--color-purple-300))',
          400: 'rgb(var(--color-purple-400))',
          500: 'rgb(var(--color-purple-500))',
          600: 'rgb(var(--color-purple-600))',
          700: 'rgb(var(--color-purple-700))',
          800: 'rgb(var(--color-purple-800))',
          900: 'rgb(var(--color-purple-900))',
          1000: 'rgb(var(--color-purple-1000))',
        },
        baseBackground: 'rgb(var(--color-base-background))',
        vividGreen: {
          50: 'rgb(var(--color-vivid-green-50))',
          100: 'rgb(var(--color-vivid-green-100))',
          200: 'rgb(var(--color-vivid-green-200))',
          300: 'rgb(var(--color-vivid-green-300))',
          400: 'rgb(var(--color-vivid-green-400))',
          500: 'rgb(var(--color-vivid-green-500))',
          600: 'rgb(var(--color-vivid-green-600))',
          700: 'rgb(var(--color-vivid-green-700))',
          800: 'rgb(var(--color-vivid-green-800))',
          900: 'rgb(var(--color-vivid-green-900))',
          1000: 'rgb(var(--color-vivid-green-1000))',
        },
        white: 'rgb(var(--color-white))',
      },
    },
  },
  plugins: [],
};
