import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'typography-body-10 border-border border border-x-0 border-b-[1px] border-t-0 p-2 text-left align-bottom',
    },
    variants: {
      bordered: {
        true: { base: 'border-x-1' },
      },
      highlighted: { true: { base: 'border-b-primary border border-b-[3px]' } },
      highlightStart: { true: { base: 'border-l-primary border border-b-[3px] border-l-[6px]' } },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
