import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'flex gap-2 sm:gap-3',
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
  },
});
