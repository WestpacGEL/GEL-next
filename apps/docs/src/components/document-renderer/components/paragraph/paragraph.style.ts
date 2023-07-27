import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'typography-body-10 my-3',
  variants: {
    textAlign: {
      center: 'text-center',
      end: 'text-right',
    },
  },
});
