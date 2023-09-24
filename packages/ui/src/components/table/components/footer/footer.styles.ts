import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'typography-body-10 p-2 text-left font-light text-muted' },
    variants: {
      bordered: {
        true: { base: 'border border-border' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
