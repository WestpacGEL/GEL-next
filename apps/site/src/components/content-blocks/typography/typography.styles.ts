import { tv } from 'tailwind-variants';

export const linkStyles = tv({
  base: 'focus-visible:focus-outline underline',
  variants: {
    color: {
      default: 'text-text-primary',
      blue: 'text-gel-icon',
    },
  },
});
