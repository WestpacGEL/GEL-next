import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'h-5 w-5 text-muted hover:text-link xsl:h-6 xsl:w-6',
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
