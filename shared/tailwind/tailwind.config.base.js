import colors from './tailwindColors';
import defaultTheme from './defaultTheme';
module.exports = {
  theme: {
    extend: {
      transitionDuration: {
        4000: '4000ms',
      },
      borderWidth: {
        1.5: '1.5px',
      },
      keyframes: {
        progressBar: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        toast: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        progressBar: 'progressBar 1s ease-in-out',
        toast: 'toast 0.3s ease-in-out',
      },
      fontFamily: {
        vazirmatn: 'vazirmatn',
        sans: ['"vazirmatn"', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        xs: '0px 1px 1px 0px rgba(0, 11, 23, 0.06)',
        sm: '0px 3px 4px 0px rgba(0, 11, 23, 0.04)',
        md: '0px 2px 8px 0px rgba(0, 11, 23, 0.04)',
        md2: '0px -4px 6px 0px rgba(0, 11, 23, 0.05)',
        lg: '0px 1px 100px 0px rgba(0, 11, 23, 0.12)',
        xl: '0px 0.8px 0.5px 0px rgba(0, 11, 23, 0.34)',
        '2xl': '1px 3px 4px 0px rgba(0, 11, 23, 0.12)',
        '3xl': '0px 4px 8px 0px rgba(0, 11, 23, 0.09)',
        '4xl': '1px 2px 4.5px 0px rgba(0, 11, 23, 0.24)',
        '5xl': '0px 4px 8px 0px rgba(0, 11, 23, 0.2)',
        '6xl': '4px 4px 6px 0px rgba(0, 11, 23, 0.16)',
        '7xl': '2px 8px 10px 0px rgba(0, 11, 23, 0.16)',
        '8xl': '4px 10px 10px 0px rgba(0, 11, 23, 0.16)',
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
      colors: colors || {},
      screens: {
        '3xl': '1680px',
        '4xl': '1920px',
        '5xl': '2560px',
        '6xl': '3560px',
      },
    },
  },
  plugins: [],
};
