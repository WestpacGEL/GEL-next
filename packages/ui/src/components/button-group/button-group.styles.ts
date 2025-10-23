import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'flex',
  },
  variants: {
    orientation: {
      horizontal: {
        base: 'flex-row',
      },
      vertical: {
        base: 'flex-col',
      },
    },
  },
});
