import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'rounded border border-border p-2 sm:p-4',
    variants: {
      color: {
        light: 'bg-light',
        white: 'bg-white',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
