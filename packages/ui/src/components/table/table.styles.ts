import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'mb-4 w-full',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
