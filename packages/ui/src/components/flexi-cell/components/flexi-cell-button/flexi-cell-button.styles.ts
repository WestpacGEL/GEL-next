import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'text-muted' },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
