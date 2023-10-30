import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex flex-col items-center',
      ul: 'flex overflow-hidden',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
