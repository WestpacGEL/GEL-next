import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'text-text-muted' },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
