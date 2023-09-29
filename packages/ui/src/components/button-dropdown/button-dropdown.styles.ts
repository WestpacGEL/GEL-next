import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'focus:focus-outline',
      panel: 'overflow-hidden',
    },
    variants: {
      dropdownSize: {
        small: {
          panel: 'min-w-[8.125rem]',
        },
        medium: {
          panel: 'min-w-[11.875rem]',
        },
        large: {
          panel: 'min-w-[15.625rem]',
        },
      },
      block: {
        true: {
          panel: '',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
