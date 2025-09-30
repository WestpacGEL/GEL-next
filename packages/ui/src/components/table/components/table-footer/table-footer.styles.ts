import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: { base: 'typography-body-10 bg-background-white-pale text-text-muted p-2 text-left' },
  variants: {
    bordered: {
      true: { base: 'border-border-muted-soft border' },
    },
  },
});
