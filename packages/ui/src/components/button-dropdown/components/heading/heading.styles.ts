import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'typography-body-10 -mx-1 mb-3 mt-4 bg-background p-[0.4375rem] font-medium text-hero first-of-type:-mt-1',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
