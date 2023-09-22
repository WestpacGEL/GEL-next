import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative inline-block',
      button: 'focus:focus-outline',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
