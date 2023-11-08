import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'sticky top-0 z-[11] transition-shadow delay-0 duration-200 ease-[ease]',
  variants: {
    shadow: {
      true: 'shadow-[0_8px_8px_rgba(0,0,0,0.24)]',
    },
  },
});
