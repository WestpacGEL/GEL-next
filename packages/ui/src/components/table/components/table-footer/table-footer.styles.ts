import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: { base: 'bg-background-white p-2 text-left typography-body-10 text-text-muted' },
  variants: {
    bordered: {
      true: { base: 'border border-border-muted-soft' },
    },
  },
});
