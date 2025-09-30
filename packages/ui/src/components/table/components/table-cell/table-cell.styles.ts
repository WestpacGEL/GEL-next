import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'typography-body-10 border-border-muted-soft text-text-body border border-x-0 border-t-0 p-2 text-left align-top',
  },
  variants: {
    bordered: {
      true: { base: 'border-x' },
    },
    highlighted: { true: { base: 'border-b-border-primary border border-b-2' } },
    highlightStart: { true: { base: 'border border-b-2' } },
  },
});
