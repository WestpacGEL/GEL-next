import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative inline-block',
      button: '',
    },
    variants: {
      linkStyling: {
        true: {
          button: 'p-0',
        },
        false: {},
      },
      look: {
        unstyled: {
          button: 'p-0 text-left',
          false: {},
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
