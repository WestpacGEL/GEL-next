import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'text-muted hover:text-link md:h-4 md:w-4',
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
