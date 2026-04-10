import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    item: 'p-2 outline-none hover:bg-background-hero hover:text-text-mono',
  },
  variants: {
    isFocusVisible: {
      true: { item: 'focus-outline' },
    },
  },
});
