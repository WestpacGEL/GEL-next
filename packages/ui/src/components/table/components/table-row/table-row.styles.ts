import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: { base: 'group/row' },
  variants: {
    striped: { true: { base: 'even:bg-surface-muted-faint' }, false: { base: 'hover:bg-surface-hover-muted-pale' } },
    highlightedRow: { true: { base: 'border-b-2 border-r-0 border-border-primary' } },
  },
});
