import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'typography-body-10 p-2 text-left text-text-muted' },
    variants: {
      bordered: {
        true: { base: 'border border-border-muted-soft' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
