const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
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

      colors: {
        surface: {
          neutral: {
            background: 'var(--color-surface-neutral-background)',
            primary: 'var(--color-surface-neutral-primary)',
            secondarycontrast: 'var(--color-surface-neutral-secondarycontrast)',
            secondary: 'var(--color-surface-neutral-secondary)',
            tertiary: 'var(--color-surface-neutral-tertiary)',
            disable: 'var(--color-surface-neutral-disable)',
          },
          brand: {
            50: 'var(--color-surface-brand-50)',
            100: 'var(--color-surface-brand-100)',
            200: 'var(--color-surface-brand-200)',
            300: {
              disable: 'var(--color-surface-brand-300-disable)',
            },
            400: 'var(--color-surface-brand-400)',
            500: 'var(--color-surface-brand-500)',
            600: {
              primary: 'var(--color-surface-brand-600-primary)',
            },
            700: {
              contrast: 'var(--color-surface-brand-700-contrast)',
            },
            800: {
              highcontrast: 'var(--color-surface-brand-800-highcontrast)',
            },
          },
          message: {
            info: {
              100: {
                soft: 'var(--color-surface-message-info-100-soft)',
              },
              300: {
                disable: 'var(--color-surface-message-info-300-disable)',
              },
              600: {
                primary: 'var(--color-surface-message-info-600-primary)',
              },
              700: {
                contrast: 'var(--color-surface-message-info-700-contrast)',
              },
              800: {
                highcontrast:
                  'var(--color-surface-message-info-800-highcontrast)',
              },
            },
            error: {
              100: {
                soft: 'var(--color-surface-message-error-100-soft)',
              },
              300: {
                disable: 'var(--color-surface-message-error-300-disable)',
              },
              600: {
                primary: 'var(--color-surface-message-error-600-primary)',
              },
              700: {
                contrast: 'var(--color-surface-message-error-700-contrast)',
              },
              800: {
                highcontrast:
                  'var(--color-surface-message-error-800-highcontrast)',
              },
            },
            success: {
              100: {
                soft: 'var(--color-surface-message-success-100-soft)',
              },
              300: {
                disable: 'var(--color-surface-message-success-300-disable)',
              },
              600: {
                primary: 'var(--color-surface-message-success-600-primary)',
              },
              700: {
                contrast: 'var(--color-surface-message-success-700-contrast)',
              },
              800: {
                highcontrast:
                  'var(--color-surface-message-success-800-highcontrast)',
              },
            },
            warning: {
              100: {
                soft: 'var(--color-surface-message-warning-100-soft)',
              },
              300: {
                disable: 'var(--color-surface-message-warning-300-disable)',
              },
              600: {
                primary: 'var(--color-surface-message-warning-600-primary)',
              },
              700: {
                contrast: 'var(--color-surface-message-warning-700-contrast)',
              },
              800: {
                highcontrast:
                  'var(--color-surface-message-warning-800-highcontrast)',
              },
            },
          },
          accent: {
            blue: {
              50: 'var(--color-surface-accent-blue-50)',
              100: 'var(--color-surface-accent-blue-100)',
              200: 'var(--color-surface-accent-blue-200)',
              300: 'var(--color-surface-accent-blue-300)',
              400: 'var(--color-surface-accent-blue-400)',
              500: 'var(--color-surface-accent-blue-500)',
              600: 'var(--color-surface-accent-blue-600)',
              700: 'var(--color-surface-accent-blue-700)',
              800: 'var(--color-surface-accent-blue-800)',
              900: 'var(--color-surface-accent-blue-900)',
              1000: 'var(--color-surface-accent-blue-1000)',
            },
            red: {
              50: 'var(--color-surface-accent-red-50)',
              100: 'var(--color-surface-accent-red-100)',
              200: 'var(--color-surface-accent-red-200)',
              300: 'var(--color-surface-accent-red-300)',
              400: 'var(--color-surface-accent-red-400)',
              500: 'var(--color-surface-accent-red-500)',
              600: 'var(--color-surface-accent-red-600)',
              700: 'var(--color-surface-accent-red-700)',
              800: 'var(--color-surface-accent-red-800)',
              900: 'var(--color-surface-accent-red-900)',
              1000: 'var(--color-surface-accent-red-1000)',
            },
            green: {
              50: 'var(--color-surface-accent-green-50)',
              100: 'var(--color-surface-accent-green-100)',
              200: 'var(--color-surface-accent-green-200)',
              300: 'var(--color-surface-accent-green-300)',
              400: 'var(--color-surface-accent-green-400)',
              500: 'var(--color-surface-accent-green-500)',
              600: 'var(--color-surface-accent-green-600)',
              700: 'var(--color-surface-accent-green-700)',
              800: 'var(--color-surface-accent-green-800)',
              900: 'var(--color-surface-accent-green-900)',
              1000: 'var(--color-surface-accent-green-1000)',
            },
            yellow: {
              50: 'var(--color-surface-accent-yellow-50)',
              100: 'var(--color-surface-accent-yellow-100)',
              200: 'var(--color-surface-accent-yellow-200)',
              300: 'var(--color-surface-accent-yellow-300)',
              400: 'var(--color-surface-accent-yellow-400)',
              500: 'var(--color-surface-accent-yellow-500)',
              600: 'var(--color-surface-accent-yellow-600)',
              700: 'var(--color-surface-accent-yellow-700)',
              800: 'var(--color-surface-accent-yellow-800)',
              900: 'var(--color-surface-accent-yellow-900)',
              1000: 'var(--color-surface-accent-yellow-1000)',
            },
            vividgreen: {
              50: 'var(--color-surface-accent-vividgreen-50)',
              100: 'var(--color-surface-accent-vividgreen-100)',
              200: 'var(--color-surface-accent-vividgreen-200)',
              300: 'var(--color-surface-accent-vividgreen-300)',
              400: 'var(--color-surface-accent-vividgreen-400)',
              500: 'var(--color-surface-accent-vividgreen-500)',
              600: 'var(--color-surface-accent-vividgreen-600)',
              700: 'var(--color-surface-accent-vividgreen-700)',
              800: 'var(--color-surface-accent-vividgreen-800)',
              900: 'var(--color-surface-accent-vividgreen-900)',
              1000: 'var(--color-surface-accent-vividgreen-1000)',
            },
            purple: {
              50: 'var(--color-surface-accent-purple-50)',
              100: 'var(--color-surface-accent-purple-100)',
              200: 'var(--color-surface-accent-purple-200)',
              300: 'var(--color-surface-accent-purple-300)',
              400: 'var(--color-surface-accent-purple-400)',
              500: 'var(--color-surface-accent-purple-500)',
              600: 'var(--color-surface-accent-purple-600)',
              700: 'var(--color-surface-accent-purple-700)',
              800: 'var(--color-surface-accent-purple-800)',
              900: 'var(--color-surface-accent-purple-900)',
              1000: 'var(--color-surface-accent-purple-1000)',
            },
            gray: {
              50: 'var(--color-surface-accent-gray-50)',
              100: 'var(--color-surface-accent-gray-100)',
              200: 'var(--color-surface-accent-gray-200)',
              300: 'var(--color-surface-accent-gray-300)',
              400: 'var(--color-surface-accent-gray-400)',
              500: 'var(--color-surface-accent-gray-500)',
              600: 'var(--color-surface-accent-gray-600)',
              700: 'var(--color-surface-accent-gray-700)',
              800: 'var(--color-surface-accent-gray-800)',
              900: 'var(--color-surface-accent-gray-900)',
              1000: 'var(--color-surface-accent-gray-1000)',
            },
            pink: {
              50: 'var(--color-surface-accent-pink-50)',
              100: 'var(--color-surface-accent-pink-100)',
              200: 'var(--color-surface-accent-pink-200)',
              300: 'var(--color-surface-accent-pink-300)',
              400: 'var(--color-surface-accent-pink-400)',
              500: 'var(--color-surface-accent-pink-500)',
              600: 'var(--color-surface-accent-pink-600)',
              700: 'var(--color-surface-accent-pink-700)',
              800: 'var(--color-surface-accent-pink-800)',
              900: 'var(--color-surface-accent-pink-900)',
              1000: 'var(--color-surface-accent-pink-1000)',
            },
          },
        },
        text: {
          neutral: {
            primary: 'var(--color-text-neutral-primary)',
            secondarycontrast: 'var(--color-text-neutral-secondarycontrast)',
            secondary: 'var(--color-text-neutral-secondary)',
            tertiary: 'var(--color-text-neutral-tertiary)',
            disable: 'var(--color-text-neutral-disable)',
            white: 'var(--color-text-neutral-white)',
            oninverse: 'var(--color-text-neutral-oninverse)',
            oncoloreddisable: 'var(--color-text-neutral-oncoloreddisable)',
          },
          brand: {
            disable: {
              300: 'var(--color-text-brand-disable-300)',
            },
            primary: {
              600: 'var(--color-text-brand-primary-600)',
            },
            contrast: {
              700: 'var(--color-text-brand-contrast-700)',
            },
            highcontrast: {
              800: 'var(--color-text-brand-highcontrast-800)',
            },
          },
          message: {
            info: {
              primary: {
                600: 'var(--color-text-message-info-primary-600)',
              },
              contrast: {
                700: 'var(--color-text-message-info-contrast-700)',
              },
              oninverse: 'var(--color-text-message-info-oninverse)',
            },
            error: {
              primary: {
                600: 'var(--color-text-message-error-primary-600)',
              },
              contrast: {
                700: 'var(--color-text-message-error-contrast-700)',
              },
              highcontrast: {
                800: 'var(--color-text-message-error-highcontrast-800)',
              },
              disable: {
                300: 'var(--color-text-message-error-disable-300)',
              },
              oninverse: 'var(--color-text-message-error-oninverse)',
            },
            success: {
              primary: {
                600: 'var(--color-text-message-success-primary-600)',
              },
              contrast: {
                700: 'var(--color-text-message-success-contrast-700)',
              },
              highcontrast: {
                800: 'var(--color-text-message-success-highcontrast-800)',
              },
              disable: {
                300: 'var(--color-text-message-success-disable-300)',
              },
              oninverse: 'var(--color-text-message-success-oninverse)',
            },
            warning: {
              primary: {
                600: 'var(--color-text-message-warning-primary-600)',
              },
              contrast: {
                700: 'var(--color-text-message-warning-contrast-700)',
              },
              oninverse: 'var(--color-text-message-warning-oninverse)',
            },
          },
          accent: {
            blue: {
              primary: {
                600: 'var(--color-text-accent-blue-primary-600)',
              },
              contrast: {
                700: 'var(--color-text-accent-blue-contrast-700)',
              },
            },
            red: {
              primary: {
                600: 'var(--color-text-accent-red-primary-600)',
              },
              contrast: {
                700: 'var(--color-text-accent-red-contrast-700)',
              },
            },
            green: {
              primary: {
                600: 'var(--color-text-accent-green-primary-600)',
              },
              contrast: {
                700: 'var(--color-text-accent-green-contrast-700)',
              },
            },
            yellow: {
              primary: {
                700: 'var(--color-text-accent-yellow-primary-700)',
              },
              contrast: {
                800: 'var(--color-text-accent-yellow-contrast-800)',
              },
            },
            purple: {
              primary: {
                600: 'var(--color-text-accent-purple-primary-600)',
              },
              contrast: {
                700: 'var(--color-text-accent-purple-contrast-700)',
              },
            },
          },
          onbrand: {
            neutral: {
              primary: {
                on600: 'var(--color-text-onbrand-neutral-primary-on600)',
                onbelow600:
                  'var(--color-text-onbrand-neutral-primary-onbelow600)',
                onabove600:
                  'var(--color-text-onbrand-neutral-primary-onabove600)',
              },
              secondary: {
                on100_50:
                  'var(--color-text-onbrand-neutral-secondary-on100_50)',
              },
            },
            colored: {
              primary: {
                on200_100_50:
                  'var(--color-text-onbrand-colored-primary-on200_100_50)',
              },
              secondary: {
                on100_50:
                  'var(--color-text-onbrand-colored-secondary-on100_50)',
              },
            },
          },
          onmessage: {
            neutral: {
              primary: {
                on600: 'var(--color-text-onmessage-neutral-primary-on600)',
                onbelow600:
                  'var(--color-text-onmessage-neutral-primary-onbelow600)',
                onabove600:
                  'var(--color-text-onmessage-neutral-primary-onabove600)',
              },
              secondary: {
                on100_50:
                  'var(--color-text-onmessage-neutral-secondary-on100_50)',
              },
            },
            colored: {
              oninfo: {
                on200_100:
                  'var(--color-text-onmessage-colored-oninfo-on200_100)',
              },
              onerror: {
                on200_100:
                  'var(--color-text-onmessage-colored-onerror-on200_100)',
              },
              onsuccess: {
                on200_100:
                  'var(--color-text-onmessage-colored-onsuccess-on200_100)',
              },
              onwarning: {
                on200_100:
                  'var(--color-text-onmessage-colored-onwarning-on200_100)',
              },
            },
          },
          onaccent: {
            neutral: {
              primary: {
                on600: 'var(--color-text-onaccent-neutral-primary-on600)',
                onbelow600:
                  'var(--color-text-onaccent-neutral-primary-onbelow600)',
                onabove600:
                  'var(--color-text-onaccent-neutral-primary-onabove600)',
              },
              secondary: {
                on100_50:
                  'var(--color-text-onaccent-neutral-secondary-on100_50)',
              },
            },
            colored: {
              onblue: {
                on200_100_50:
                  'var(--color-text-onaccent-colored-onblue-on200_100_50)',
              },
              onpurple: {
                on200_100_50:
                  'var(--color-text-onaccent-colored-onpurple-on200_100_50)',
              },
              onred: {
                on200_100_50:
                  'var(--color-text-onaccent-colored-onred-on200_100_50)',
              },
              ongreen: {
                on200_100_50:
                  'var(--color-text-onaccent-colored-ongreen-on200_100_50)',
              },
              onvividgreen: {
                on200_100_50:
                  'var(--color-text-onaccent-colored-onvividgreen-on200_100_50)',
              },
              onyellow: {
                on200_100_50:
                  'var(--color-text-onaccent-colored-onyellow-on200_100_50)',
              },
            },
          },
        },
        icon: {
          neutral: {
            primary: 'var(--color-icon-neutral-primary)',
            secondarycontrast: 'var(--color-icon-neutral-secondarycontrast)',
            secondary: 'var(--color-icon-neutral-secondary)',
            disable: 'var(--color-icon-neutral-disable)',
            white: 'var(--color-icon-neutral-white)',
            oninverse: 'var(--color-icon-neutral-oninverse)',
            oncoloreddisable: 'var(--color-icon-neutral-oncoloreddisable)',
          },
          brand: {
            disable: {
              300: 'var(--color-icon-brand-disable-300)',
            },
            primary: {
              600: 'var(--color-icon-brand-primary-600)',
            },
            contrast: {
              700: 'var(--color-icon-brand-contrast-700)',
            },
            highcontrast: {
              800: 'var(--color-icon-brand-highcontrast-800)',
            },
            aress: {
              logo: 'var(--color-icon-brand-aress-logo)',
            },
          },
          message: {
            info: {
              primary: {
                600: 'var(--color-icon-message-info-primary-600)',
              },
              contrast: {
                700: 'var(--color-icon-message-info-contrast-700)',
              },
              oninverse: 'var(--color-icon-message-info-oninverse)',
            },
            error: {
              primary: {
                600: 'var(--color-icon-message-error-primary-600)',
              },
              contrast: {
                700: 'var(--color-icon-message-error-contrast-700)',
              },
              highcontrast: {
                800: 'var(--color-icon-message-error-highcontrast-800)',
              },
              disable: {
                300: 'var(--color-icon-message-error-disable-300)',
              },
              oninverse: 'var(--color-icon-message-error-oninverse)',
            },
            success: {
              primary: {
                600: 'var(--color-icon-message-success-primary-600)',
              },
              contrast: {
                700: 'var(--color-icon-message-success-contrast-700)',
              },
              highcontrast: {
                800: 'var(--color-icon-message-success-highcontrast-800)',
              },
              disable: {
                300: 'var(--color-icon-message-success-disable-300)',
              },
              oninverse: 'var(--color-icon-message-success-oninverse)',
            },
            warning: {
              primary: {
                600: 'var(--color-icon-message-warning-primary-600)',
              },
              contrast: {
                700: 'var(--color-icon-message-warning-contrast-700)',
              },
              oninverse: 'var(--color-icon-message-warning-oninverse)',
            },
          },
          accent: {
            blue: {
              primary: {
                600: 'var(--color-icon-accent-blue-primary-600)',
              },
              contrast: {
                700: 'var(--color-icon-accent-blue-contrast-700)',
              },
            },
            red: {
              primary: {
                600: 'var(--color-icon-accent-red-primary-600)',
              },
              contrast: {
                700: 'var(--color-icon-accent-red-contrast-700)',
              },
            },
            green: {
              primary: {
                600: 'var(--color-icon-accent-green-primary-600)',
              },
              contrast: {
                700: 'var(--color-icon-accent-green-contrast-700)',
              },
            },
            vividgreen: {
              primary: {
                600: 'var(--color-icon-accent-vividgreen-primary-600)',
              },
              contrast: {
                700: 'var(--color-icon-accent-vividgreen-contrast-700)',
              },
            },
            yellow: {
              primary: {
                600: 'var(--color-icon-accent-yellow-primary-600)',
              },
              contrast: {
                700: 'var(--color-icon-accent-yellow-contrast-700)',
              },
            },
            pink: {
              primary: {
                600: 'var(--color-icon-accent-pink-primary-600)',
              },
              contrast: {
                700: 'var(--color-icon-accent-pink-contrast-700)',
              },
            },
          },
          onbrand: {
            neutral: {
              on600: 'var(--color-icon-onbrand-neutral-on600)',
              onbelow600: 'var(--color-icon-onbrand-neutral-onbelow600)',
              onabove600: 'var(--color-icon-onbrand-neutral-onabove600)',
            },
            colored: {
              primary: {
                on200_100_50:
                  'var(--color-icon-onbrand-colored-primary-on200_100_50)',
              },
              secondary: {
                on100_50:
                  'var(--color-icon-onbrand-colored-secondary-on100_50)',
              },
            },
          },
          onmessage: {
            neutral: {
              on600: 'var(--color-icon-onmessage-neutral-on600)',
              onbelow600: 'var(--color-icon-onmessage-neutral-onbelow600)',
              onabove600: 'var(--color-icon-onmessage-neutral-onabove600)',
            },
            colored: {
              oninfo: {
                on200_100:
                  'var(--color-icon-onmessage-colored-oninfo-on200_100)',
              },
              onerror: {
                on200_100:
                  'var(--color-icon-onmessage-colored-onerror-on200_100)',
              },
              onsuccess: {
                on200_100:
                  'var(--color-icon-onmessage-colored-onsuccess-on200_100)',
              },
              onwarning: {
                on200_100:
                  'var(--color-icon-onmessage-colored-onwarning-on200_100)',
              },
            },
          },
          onaccent: {
            neutral: {
              on600: 'var(--color-icon-onaccent-neutral-on600)',
              onbelow600: 'var(--color-icon-onaccent-neutral-onbelow600)',
              onabove600: 'var(--color-icon-onaccent-neutral-onabove600)',
            },
            colored: {
              onblue: {
                on200_100_50:
                  'var(--color-icon-onaccent-colored-onblue-on200_100_50)',
              },
              onpurple: {
                on200_100_50:
                  'var(--color-icon-onaccent-colored-onpurple-on200_100_50)',
              },
              onred: {
                on200_100_50:
                  'var(--color-icon-onaccent-colored-onred-on200_100_50)',
              },
              ongreen: {
                on200_100_50:
                  'var(--color-icon-onaccent-colored-ongreen-on200_100_50)',
              },
              onvividgreen: {
                on200_100_50:
                  'var(--color-icon-onaccent-colored-onvividgreen-on200_100_50)',
              },
              onyellow: {
                on200_100_50:
                  'var(--color-icon-onaccent-colored-onyellow-on200_100_50)',
              },
            },
          },
        },
        border: {
          neutral: {
            primary: 'var(--color-border-neutral-primary)',
            secondary: 'var(--color-border-neutral-secondary)',
            tertiary: 'var(--color-border-neutral-tertiary)',
            contrast: 'var(--color-border-neutral-contrast)',
            highcontrast: 'var(--color-border-neutral-highcontrast)',
            maximumcontrast: 'var(--color-border-neutral-maximumcontrast)',
            disable: 'var(--color-border-neutral-disable)',
            white: 'var(--color-border-neutral-white)',
            oninverse: 'var(--color-border-neutral-oninverse)',
          },
          brand: {
            soft: {
              200: 'var(--color-border-brand-soft-200)',
            },
            disable: {
              300: 'var(--color-border-brand-disable-300)',
            },
            primary: {
              600: 'var(--color-border-brand-primary-600)',
            },
            contrast: {
              700: 'var(--color-border-brand-contrast-700)',
            },
            highcontrast: {
              800: 'var(--color-border-brand-highcontrast-800)',
            },
          },
          message: {
            info: {
              disable: {
                300: 'var(--color-border-message-info-disable-300)',
              },
              soft: {
                400: 'var(--color-border-message-info-soft-400)',
              },
              primary: {
                600: 'var(--color-border-message-info-primary-600)',
              },
            },
            error: {
              disable: {
                300: 'var(--color-border-message-error-disable-300)',
              },
              soft: {
                400: 'var(--color-border-message-error-soft-400)',
              },
              primary: {
                600: 'var(--color-border-message-error-primary-600)',
              },
              contrast: {
                700: 'var(--color-border-message-error-contrast-700)',
              },
              highcontrast: {
                800: 'var(--color-border-message-error-highcontrast-800)',
              },
            },
            success: {
              disable: {
                300: 'var(--color-border-message-success-disable-300)',
              },
              soft: {
                400: 'var(--color-border-message-success-soft-400)',
              },
              primary: {
                600: 'var(--color-border-message-success-primary-600)',
              },
              contrast: {
                700: 'var(--color-border-message-success-contrast-700)',
              },
              highcontrast: {
                800: 'var(--color-border-message-success-highcontrast-800)',
              },
            },
            warning: {
              disable: {
                300: 'var(--color-border-message-warning-disable-300)',
              },
              soft: {
                400: 'var(--color-border-message-warning-soft-400)',
              },
              primary: {
                600: 'var(--color-border-message-warning-primary-600)',
              },
            },
          },
          accent: {
            blue: {
              50: 'var(--color-border-accent-blue-50)',
              100: 'var(--color-border-accent-blue-100)',
              200: 'var(--color-border-accent-blue-200)',
              300: 'var(--color-border-accent-blue-300)',
              400: 'var(--color-border-accent-blue-400)',
              500: 'var(--color-border-accent-blue-500)',
              600: 'var(--color-border-accent-blue-600)',
              700: 'var(--color-border-accent-blue-700)',
              800: 'var(--color-border-accent-blue-800)',
              900: 'var(--color-border-accent-blue-900)',
              1000: 'var(--color-border-accent-blue-1000)',
            },
            red: {
              50: 'var(--color-border-accent-red-50)',
              100: 'var(--color-border-accent-red-100)',
              200: 'var(--color-border-accent-red-200)',
              300: 'var(--color-border-accent-red-300)',
              400: 'var(--color-border-accent-red-400)',
              500: 'var(--color-border-accent-red-500)',
              600: 'var(--color-border-accent-red-600)',
              700: 'var(--color-border-accent-red-700)',
              800: 'var(--color-border-accent-red-800)',
              900: 'var(--color-border-accent-red-900)',
              1000: 'var(--color-border-accent-red-1000)',
            },
            green: {
              50: 'var(--color-border-accent-green-50)',
              100: 'var(--color-border-accent-green-100)',
              200: 'var(--color-border-accent-green-200)',
              300: 'var(--color-border-accent-green-300)',
              400: 'var(--color-border-accent-green-400)',
              500: 'var(--color-border-accent-green-500)',
              600: 'var(--color-border-accent-green-600)',
              700: 'var(--color-border-accent-green-700)',
              800: 'var(--color-border-accent-green-800)',
              900: 'var(--color-border-accent-green-900)',
              1000: 'var(--color-border-accent-green-1000)',
            },
            vividgreen: {
              50: 'var(--color-border-accent-vividgreen-50)',
              100: 'var(--color-border-accent-vividgreen-100)',
              200: 'var(--color-border-accent-vividgreen-200)',
              300: 'var(--color-border-accent-vividgreen-300)',
              400: 'var(--color-border-accent-vividgreen-400)',
              500: 'var(--color-border-accent-vividgreen-500)',
              600: 'var(--color-border-accent-vividgreen-600)',
              700: 'var(--color-border-accent-vividgreen-700)',
              800: 'var(--color-border-accent-vividgreen-800)',
              900: 'var(--color-border-accent-vividgreen-900)',
              1000: 'var(--color-border-accent-vividgreen-1000)',
            },
            yellow: {
              50: 'var(--color-border-accent-yellow-50)',
              100: 'var(--color-border-accent-yellow-100)',
              200: 'var(--color-border-accent-yellow-200)',
              300: 'var(--color-border-accent-yellow-300)',
              400: 'var(--color-border-accent-yellow-400)',
              500: 'var(--color-border-accent-yellow-500)',
              600: 'var(--color-border-accent-yellow-600)',
              700: 'var(--color-border-accent-yellow-700)',
              800: 'var(--color-border-accent-yellow-800)',
              900: 'var(--color-border-accent-yellow-900)',
              1000: 'var(--color-border-accent-yellow-1000)',
            },
            purple: {
              50: 'var(--color-border-accent-purple-50)',
              100: 'var(--color-border-accent-purple-100)',
              200: 'var(--color-border-accent-purple-200)',
              300: 'var(--color-border-accent-purple-300)',
              400: 'var(--color-border-accent-purple-400)',
              500: 'var(--color-border-accent-purple-500)',
              600: 'var(--color-border-accent-purple-600)',
              700: 'var(--color-border-accent-purple-700)',
              800: 'var(--color-border-accent-purple-800)',
              900: 'var(--color-border-accent-purple-900)',
              1000: 'var(--color-border-accent-purple-1000)',
            },
            gray: {
              50: 'var(--color-border-accent-gray-50)',
              100: 'var(--color-border-accent-gray-100)',
              200: 'var(--color-border-accent-gray-200)',
              300: 'var(--color-border-accent-gray-300)',
              400: 'var(--color-border-accent-gray-400)',
              500: 'var(--color-border-accent-gray-500)',
              600: 'var(--color-border-accent-gray-600)',
              700: 'var(--color-border-accent-gray-700)',
              800: 'var(--color-border-accent-gray-800)',
              900: 'var(--color-border-accent-gray-900)',
              1000: 'var(--color-border-accent-gray-1000)',
            },
          },
        },
        button: {
          brand: {
            surface: {
              default: 'var(--color-button-brand-surface-default)',
              hover: 'var(--color-button-brand-surface-hover)',
              pressed: 'var(--color-button-brand-surface-pressed)',
              disable: 'var(--color-button-brand-surface-disable)',
              loading: 'var(--color-button-brand-surface-loading)',
            },
            border: {
              default: 'var(--color-button-brand-border-default)',
              hover: 'var(--color-button-brand-border-hover)',
              pressed: 'var(--color-button-brand-border-pressed)',
              disable: 'var(--color-button-brand-border-disable)',
              loading: 'var(--color-button-brand-border-loading)',
            },
            label: {
              onsurface: 'var(--color-button-brand-label-onsurface)',
              ondisablesurface:
                'var(--color-button-brand-label-ondisablesurface)',
              plain: {
                default: 'var(--color-button-brand-label-plain-default)',
                hover: 'var(--color-button-brand-label-plain-hover)',
                pressed: 'var(--color-button-brand-label-plain-pressed)',
                disable: 'var(--color-button-brand-label-plain-disable)',
                loading: 'var(--color-button-brand-label-plain-loading)',
              },
            },
          },
          error: {
            surface: {
              default: 'var(--color-button-error-surface-default)',
              hover: 'var(--color-button-error-surface-hover)',
              pressed: 'var(--color-button-error-surface-pressed)',
              disable: 'var(--color-button-error-surface-disable)',
              loading: 'var(--color-button-error-surface-loading)',
            },
            border: {
              default: 'var(--color-button-error-border-default)',
              hover: 'var(--color-button-error-border-hover)',
              pressed: 'var(--color-button-error-border-pressed)',
              disable: 'var(--color-button-error-border-disable)',
              loading: 'var(--color-button-error-border-loading)',
            },
            label: {
              onsurface: 'var(--color-button-error-label-onsurface)',
              ondisablesurface:
                'var(--color-button-error-label-ondisablesurface)',
              plain: {
                default: 'var(--color-button-error-label-plain-default)',
                hover: 'var(--color-button-error-label-plain-hover)',
                pressed: 'var(--color-button-error-label-plain-pressed)',
                disable: 'var(--color-button-error-label-plain-disable)',
                loading: 'var(--color-button-error-label-plain-loading)',
              },
            },
          },
          success: {
            surface: {
              default: 'var(--color-button-success-surface-default)',
              hover: 'var(--color-button-success-surface-hover)',
              pressed: 'var(--color-button-success-surface-pressed)',
              disable: 'var(--color-button-success-surface-disable)',
              loading: 'var(--color-button-success-surface-loading)',
            },
            border: {
              default: 'var(--color-button-success-border-default)',
              hover: 'var(--color-button-success-border-hover)',
              pressed: 'var(--color-button-success-border-pressed)',
              disable: 'var(--color-button-success-border-disable)',
              loading: 'var(--color-button-success-border-loading)',
            },
            label: {
              onsurface: 'var(--color-button-success-label-onsurface)',
              ondisablesurface:
                'var(--color-button-success-label-ondisablesurface)',
              plain: {
                default: 'var(--color-button-success-label-plain-default)',
                hover: 'var(--color-button-success-label-plain-hover)',
                pressed: 'var(--color-button-success-label-plain-pressed)',
                disable: 'var(--color-button-success-label-plain-disable)',
                loading: 'var(--color-button-success-label-plain-loading)',
              },
            },
          },
        },
        videoplayer: {
          settingspopup: {
            divider: 'var(--color-videoplayer-settingspopup-divider)',
          },
        },
      },
    },
    plugins: [],
  },
};
