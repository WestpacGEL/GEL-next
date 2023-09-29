export const generateDatePicker = () => {
  return {
    '.date-picker': {
      '.duet-date__input': {
        '@apply text-lg focus:!border-borderDark focus:!shadow-none focus:focus-outline border border-borderDark border-solid rounded':
          {},
      },
      '.duet-date__toggle': {
        '@apply shadow-none border-solid border-l !border-l-borderDark !bg-light touch-manipulation whitespace-nowrap transition hover:bg-white active:bg-white rounded-r':
          {},
        '@apply focus:shadow-none focus:focus-outline': {},
      },
      '.duet-date__select select:focus + .duet-date__select-label': {
        '@apply !focus-outline rounded': {},
      },
      '.duet-date__toggle-icon': {
        '@apply w-[18px] h-[18px] bg-cover flex-auto': {},
        'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23686362' fill-rule='evenodd' d='M20,2 L22,2 C23.1045695,2 24,2.8954305 24,4 L24,22 C24,23.1045695 23.1045695,24 22,24 L2,24 C0.8954305,24 1.3527075e-16,23.1045695 0,22 L0,4 C-1.3527075e-16,2.8954305 0.8954305,2 2,2 L4,2 L4,0 L6,0 L6,2 L18,2 L18,0 L20,0 L20,2 Z M2,8 L2,22 L22,22 L22,8 L2,8 Z M14,14 L20,14 L20,20 L14,20 L14,14 Z'%3E%3C/path%3E%3C/svg%3E")`,
        svg: {
          '@apply hidden': {},
        },
      },

      /* SIZE VARIANTS */
      '&.date-picker-sm': {
        '.duet-date__input': {
          '@apply py-[0.25rem] pl-[0.5625rem] text-sm': {},
        },
        '.duet-date__toggle': {
          '@apply px-2 w-auto': {},
        },
      },
      '&.date-picker-md': {
        '.duet-date__input': {
          '@apply py-1 pl-2 text-base': {},
        },
        '.duet-date__toggle': {
          '@apply px-2 w-auto': {},
        },
      },
      '&.date-picker-lg': {
        '.duet-date__input': {
          '@apply py-[0.5rem] pl-[0.9375.rem] text-base': {},
        },
        '.duet-date__toggle': {
          '@apply px-2 w-auto': {},
        },
        '.duet-date__toggle-icon': {
          '@apply w-[24px] h-[24px]': {},
        },
      },
      '&.date-picker-xl': {
        '.duet-date__input': {
          '@apply py-[0.5625rem] pl-[1.125rem]': {},
        },
        '.duet-date__toggle': {
          '@apply px-3 w-auto': {},
        },
        '.duet-date__toggle-icon': {
          '@apply w-[24px] h-[24px]': {},
        },
      },

      /* Calendar selects */
      '.duet-date__dialog-content': {
        '@apply bg-white': {},
      },
      '.duet-date__dialog': {
        '@apply z-10': {},
      },
      '.duet-date__select-label': {
        '@apply mt-0 font-semibold': {},
        svg: {
          '@apply text-primary': {},
        },
      },
      '.duet-date__table-header': {
        '@apply font-bold': {},
      },
      '.duet-date__prev, .duet-date__next': {
        '@apply bg-background focus:focus-outline !outline-offset-0 text-primary': {},
      },
      '.duet-date-dialog-select select:focus + .duet-date-dialog-select-label': {
        '@apply focus-outline !shadow-none': {},
        'outline-offset': '0 !important',
      },

      /* Calendar days */
      '.duet-date__day': {
        '@apply hover:!bg-primary/5 focus:!bg-white/0 focus:!text-text': {},
        '@apply active:shadow active:focus-outline focus:focus-outline focus:!shadow-none !outline-offset-0': {},
        '&.is-today': {
          '@apply !shadow-primary !text-text !bg-primary/5': {},
        },
        '&.is-disabled': {
          '@apply line-through': {},
        },

        "&[aria-pressed='true']": {
          '@apply border border-opacity-0 !bg-primary !text-white focus:!text-white': {},
        },
      },
      '.duet-date__close:focus': {
        '@apply bg-light focus-outline': {},
        'outline-offset': '0 !important',
      },
    },
  };
};
