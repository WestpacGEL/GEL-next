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
        },
        link: {
          button: 'p-0 text-left',
        },
        primary: {},
        hero: {},
        faint: {},
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
