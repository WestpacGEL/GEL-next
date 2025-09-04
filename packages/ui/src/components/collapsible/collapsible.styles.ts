import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'px-0 text-text-body no-underline hover:underline',
    content: 'typography-body-10 mb-2 block text-text-body',
  },
  variants: {
    open: {
      true: { base: 'block' },
    },
  },
});
