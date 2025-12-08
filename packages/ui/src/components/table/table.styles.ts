import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'mb-4 w-full [&_:focus-visible]:focus-outline',
      wrapper: 'max-xsl:mb-3 max-xsl:w-full max-xsl:overflow-x-auto max-xsl:overflow-y-hidden',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
