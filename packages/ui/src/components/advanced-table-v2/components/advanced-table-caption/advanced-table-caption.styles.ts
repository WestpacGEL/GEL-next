import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    caption: 'text-left typography-body-6 font-bold',
  },
  variants: {
    showCaption: {
      false: { caption: 'sr-only' },
    },
  },
  defaultVariants: {
    showCaption: false,
  },
});
