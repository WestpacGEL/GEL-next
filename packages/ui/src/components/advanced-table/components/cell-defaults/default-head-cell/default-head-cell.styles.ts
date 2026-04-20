import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    button: '',
    title: 'typography-body-9 font-medium whitespace-nowrap',
  },
  variants: {
    isReorderEnabled: {
      true: { button: 'cursor-move' },
      false: { button: 'cursor-default' },
    },
  },
});
