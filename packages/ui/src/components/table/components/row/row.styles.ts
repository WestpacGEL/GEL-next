import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'hover:bg-background' },
    variants: {
      striped: { true: { base: 'even:bg-background hover:bg-default' } },
      highlightedRow: { true: { base: 'border-primary border border-b-[3px] border-l-[6px] border-r-0' } },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
