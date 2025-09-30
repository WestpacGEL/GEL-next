import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: { base: 'flex gap-1', primaryBtn: '', secondaryBtn: 'no-underline hover:underline' },
  variants: {
    size: {
      full: { base: 'px-4 py-3' },
      lg: { base: '-mt-6 px-12 pb-12' },
      md: { base: '-mt-2 px-7 pb-7' },
      sm: { base: '-mt-2 flex-col px-5 pb-5' },
      fluid: { base: '-mt-2 px-5 pb-5 max-md:flex-col' },
    },
  },
});
