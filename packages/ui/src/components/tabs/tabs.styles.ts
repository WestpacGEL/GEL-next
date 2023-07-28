import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: '',
    variants: {
      orientation: {
        horizontal: '',
        vertical: '',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
