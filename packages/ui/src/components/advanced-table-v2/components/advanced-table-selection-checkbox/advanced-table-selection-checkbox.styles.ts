import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm',
    checkbox:
      'flex size-4 shrink-0 items-center justify-center rounded-sm border border-border-hero bg-background-white',
    checkIcon: 'overflow-visible',
  },
  variants: {
    isFocusVisible: {
      true: { checkbox: 'focus-outline' },
    },
  },
});
