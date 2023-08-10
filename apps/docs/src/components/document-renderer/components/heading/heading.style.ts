import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'mb-3',
  variants: {
    textAlign: {
      center: 'text-center',
      end: 'text-right',
    },
    level: {
      1: 'typography-body-5',
      2: 'typography-body-6',
      3: 'typography-body-7',
      4: 'typography-body-8',
      5: 'typography-body-9',
      6: 'typography-body-10',
    },
  },
});
