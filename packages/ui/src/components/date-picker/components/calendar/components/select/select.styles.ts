import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'typography-body-8 appearance-none rounded border-none bg-[transparent] pl-0 pr-4 font-semibold text-text-body',
    caret: 'pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 touch-none',
  },
  variants: {
    isFocusVisible: {
      true: { base: 'focus-outline' },
    },
  },
});
