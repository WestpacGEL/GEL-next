import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'shrink-0',
  variants: {
    textMultivalue: {
      true: 'bg-transparent',
    },
  },
});
