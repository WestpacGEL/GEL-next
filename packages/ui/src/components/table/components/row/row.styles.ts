import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'group/row' },
    variants: {
      striped: { true: { base: 'even:bg-light' }, false: { base: 'hover:bg-background' } },
      highlightedRow: { true: { base: 'border border-b-[3px] border-l-[6px] border-r-0 border-primary' } },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
