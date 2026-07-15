import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    item: 'p-2 outline-none hover:bg-surface-muted-faint',
  },
  variants: {
    isFocusVisible: {
      true: { item: 'focus-outline' },
    },
  },
});
