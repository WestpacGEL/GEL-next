import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'mt-9 font-bold',
  variants: {
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      end: 'text-right',
    },
    level: {
      1: 'typography-body-5 mb-5',
      2: 'typography-body-7 mb-7 sm:typography-body-6',
      3: 'typography-body-7 mb-5',
      4: 'typography-body-9 mb-5',
      5: 'typography-body-10 mb-2',
      6: 'typography-body-10 mb-2',
    },
  },
});
