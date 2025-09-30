import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'text-text-body px-0 no-underline hover:underline',
    content: 'typography-body-10 text-text-body mb-2 block',
  },
  variants: {
    open: {
      true: { base: 'block' },
    },
  },
});
