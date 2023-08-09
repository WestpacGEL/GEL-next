import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      button:
        'hover:cursor-pointer rounded-none group-first/buttons:rounded-l group-last/buttons:rounded-r group-[:not(:first-child)]/buttons:border-l-0',
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
