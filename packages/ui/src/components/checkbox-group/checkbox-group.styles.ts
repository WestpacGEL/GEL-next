import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: '',
    itemWrapper: '',
    revealButton: 'gap-1 px-0 text-text-body no-underline hover:underline',
    buttonText: 'typography-body-10',
  },
  variants: {
    orientation: {
      horizontal: { itemWrapper: 'flex flex-wrap' },
      vertical: { itemWrapper: 'flex flex-col items-start' },
    },
    isFocusVisible: { true: { revealButton: 'focus-outline' } },
  },
});
