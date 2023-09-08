import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'hover:bg-background' },
    variants: {
      striped: { true: { base: 'hover:bg-default even:bg-background' } },
      highlightedRow: { true: { base: 'border border-b-[3px] border-l-[6px] border-r-0 border-primary' } },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
