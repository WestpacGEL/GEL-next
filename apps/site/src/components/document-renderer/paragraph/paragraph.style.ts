import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'typography-body-9 mb-4 w-full leading-[2] last:mb-0',
  variants: {
    textAlign: {
      center: 'text-center',
      end: 'text-right',
    },
  },
});
