import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'max-xsl:px-2 typography-body-10 p-4' },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
