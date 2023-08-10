import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      buttonWrapper: 'flex',
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
