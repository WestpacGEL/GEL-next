import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'typography-body-8 text-text-body appearance-none rounded border-none bg-[transparent] pr-4 pl-0 font-semibold',
    caret: 'pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 touch-none',
  },
  variants: {
    isFocusVisible: {
      true: { base: 'focus-outline' },
    },
  },
});
