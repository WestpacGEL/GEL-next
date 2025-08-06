import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'typography-body-10 border border-x-0 border-t-0 border-border-muted-soft p-2 text-left align-top text-text-body',
    },
    variants: {
      bordered: {
        true: { base: 'border-x' },
      },
      highlighted: { true: { base: 'border border-b-2 border-b-border-primary' } },
      highlightStart: { true: { base: 'border border-b-2 border-l-2 border-l-border-primary' } },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
