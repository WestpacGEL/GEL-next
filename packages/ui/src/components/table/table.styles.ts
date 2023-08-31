import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'w-full',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
