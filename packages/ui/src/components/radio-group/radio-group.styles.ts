import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: '',
    radioWrapper: '',
    revealButton: 'gap-1 px-0 text-text-body no-underline hover:underline',
    buttonText: 'typography-body-10',
  },
  variants: {
    orientation: {
      horizontal: { radioWrapper: 'flex flex-wrap' },
      vertical: { radioWrapper: 'flex flex-col items-start' },
    },
    isFocusVisible: { true: { revealButton: 'focus-outline' } },
  },
});
