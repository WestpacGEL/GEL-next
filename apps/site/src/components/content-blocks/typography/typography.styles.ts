import { tv } from 'tailwind-variants';

export const linkStyles = tv({
  base: `
    underline
    focus-visible:focus-outline
  `,
  variants: {
    color: {
      default: 'text-text-primary',
      blue: 'text-gel-icon',
    },
  },
});
