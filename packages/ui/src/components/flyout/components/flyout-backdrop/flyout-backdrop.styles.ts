import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'fixed inset-0',
  },
  variants: {
    isOpen: {
      true: {
        base: 'animate-fadeIn bg-black/65',
      },
      false: {
        base: 'pointer-events-none',
      },
    },
  },
});
