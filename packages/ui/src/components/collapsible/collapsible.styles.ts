import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'px-0 text-text-body no-underline hover:underline',
    content: 'mb-2 block typography-body-10 text-text-body [&_:focus-visible]:focus-outline',
  },
  variants: {
    open: {
      true: { base: 'block' },
    },
  },
});
