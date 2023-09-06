import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'border-t-1 border-border bg-light max-xsl:px-2 border-0 border-t px-4 py-[0.625rem]',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
