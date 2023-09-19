import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'typography-body-10 border border-x-0 border-b-[1px] border-t-0 border-border p-2 text-left align-bottom',
    },
    variants: {
      bordered: {
        true: { base: 'border-x' },
      },
      highlighted: { true: { base: 'border border-b-[3px] border-b-primary' } },
      highlightStart: { true: { base: 'border border-b-[3px] border-l-[6px] border-l-primary' } },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
