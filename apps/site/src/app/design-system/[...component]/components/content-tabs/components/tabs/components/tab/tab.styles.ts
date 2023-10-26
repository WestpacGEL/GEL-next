import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'relative flex h-9 flex-1 cursor-pointer items-center justify-center border-r border-r-border font-semibold text-muted after:absolute after:inset-x-0 after:bottom-0 after:h-0 after:border-b-[3px] after:border-[transparent] last:border-r-0 sm:h-11 sm:grow-0 sm:px-10 sm:last:border-r',
  variants: {
    selected: {
      true: 'text-text after:border-primary',
    },
  },
});
