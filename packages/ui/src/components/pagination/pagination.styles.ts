import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'overflow-hidden rounded border border-border',
      ul: 'flex',
      li: '',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
