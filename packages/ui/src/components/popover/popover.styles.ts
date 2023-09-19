import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      button: 'focus:focus-outline',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
