import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    // 24x24px hit target (WCAG 2.5.8), centering the smaller visible box.
    base: 'flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm',
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
