import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'typography-body-10 p-4 max-xsl:px-2' },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
