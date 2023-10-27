import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      button:
        'rounded-none hover:cursor-pointer group-first/buttons:rounded-l-[0.1875rem] group-last/buttons:rounded-r-[0.1875rem] group-[:not(:first-child)]/buttons:border-l-0 active-theme-rams:border-b-primary active-theme-rams:before:hidden',
    },
    variants: {
      isDisabled: {
        true: {
          button: 'pointer-events-none opacity-50',
        },
      },
      isFocusVisible: {
        true: {
          button: 'relative focus-outline',
        },
      },
      block: {
        true: {
          base: 'w-full',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
