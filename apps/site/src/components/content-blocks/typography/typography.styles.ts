import { tv } from 'tailwind-variants';

export const linkStyles = tv({
  base: 'underline',
  variants: {
    color: {
      default: 'text-primary',
      blue: 'text-gel-icon',
    },
  },
});
