import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: '',
    itemWrapper: '',
    revealButton: 'text-text-body gap-1 px-0 no-underline hover:underline',
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
