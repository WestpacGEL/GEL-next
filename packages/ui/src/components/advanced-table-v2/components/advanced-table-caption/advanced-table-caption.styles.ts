import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    caption: 'p-3 text-left typography-body-8',
  },
  variants: {
    // `sr-only` (not `hidden`) so a hidden caption still names the table for
    // screen readers — the point of hiding is visual only.
    hideCaption: {
      true: { caption: 'sr-only' },
    },
  },
  defaultVariants: {
    hideCaption: false,
  },
});
