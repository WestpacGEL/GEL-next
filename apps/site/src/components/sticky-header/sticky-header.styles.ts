import { tv } from 'tailwind-variants';

export const styles = tv({
  base: `
    sticky top-0 z-[1000] bg-background-white-pale transition-shadow delay-0
    duration-200 ease-[ease]
  `,
  variants: {
    shadow: {
      none: '',
      thick: 'shadow-[0_8px_8px_rgba(0,0,0,0.24)]',
      thin: 'shadow-[0_2px_5px_rgba(0,0,0,0.3)]',
    },
  },
});
