import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    button: '',
    title: 'font-medium whitespace-nowrap',
  },
  variants: {
    isReorderEnabled: {
      true: { button: 'cursor-move' },
      false: { button: 'cursor-default' },
    },
  },
});
