import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'group/row' },
    variants: {
      striped: { true: { base: 'even:bg-surface-muted-faint' }, false: { base: 'hover:bg-surface-muted-pale' } },
      highlightedRow: { true: { base: 'border border-b-[2px] border-l-[2px] border-r-0 border-border-primary' } },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
