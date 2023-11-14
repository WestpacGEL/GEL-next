import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'mb-2 w-full leading-[2] last:mb-0',
  variants: {
    textAlign: {
      center: 'text-center',
      end: 'text-right',
    },
    type: {
      default: 'typography-body-9',
      graphik: 'typography-site-9',
    },
  },
});
