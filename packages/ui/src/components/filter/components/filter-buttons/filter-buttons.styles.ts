import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative flex justify-start',
    buttonList: 'flex w-full touch-pan-x gap-1 overflow-x-auto overflow-y-visible whitespace-nowrap',
    scrollButton: 'absolute rounded-none from-surface-mono to-[transparent] contrast-more:bg-surface-mono',
  },
  variants: {
    position: {
      left: {
        scrollButton: '-left-1 bg-[linear-gradient(to_right,_var(--tw-gradient-from)_66%,_var(--tw-gradient-to))] pl-0',
      },
      right: {
        scrollButton:
          '-right-1 bg-gradient-to-l bg-[linear-gradient(to_left,_var(--tw-gradient-from)_66%,_var(--tw-gradient-to))] pr-0',
      },
    },
    hidden: {
      true: {
        scrollButton: 'hidden',
      },
    },
  },
});
