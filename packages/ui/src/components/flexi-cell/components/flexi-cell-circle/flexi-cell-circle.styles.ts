import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'h-5 w-5 text-muted hover:text-link md:h-6 md:w-6',
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
