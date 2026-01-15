import { tv } from 'tailwind-variants';

export const linkStyles = tv({
  base: 'underline hover:no-underline focus-visible:focus-outline',
  variants: {
    color: {
      default: 'text-primary',
      blue: 'text-gel-icon',
    },
  },
});
