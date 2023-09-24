import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'border-t-1 border-0 border-t border-border bg-light px-4 py-[0.625rem] max-xsl:px-2',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
