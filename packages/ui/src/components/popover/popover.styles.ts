import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative inline-block',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
