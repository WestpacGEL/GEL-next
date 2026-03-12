import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative -left-1 flex justify-start', // left positioning for padding on buttons to show focus ring but be aligned to input
    buttonList: 'flex w-full touch-pan-x gap-1 overflow-x-scroll overflow-y-visible p-1 whitespace-nowrap',
    scrollButton:
      'absolute inset-y-0 h-auto rounded-none from-surface-mono to-[transparent] contrast-more:bg-surface-mono',
  },
  variants: {
    position: {
      left: {
        scrollButton: '-left-0 bg-[linear-gradient(to_right,_var(--tw-gradient-from)_66%,_var(--tw-gradient-to))] pl-0',
      },
      right: {
        scrollButton:
          '-right-2 bg-gradient-to-l bg-[linear-gradient(to_left,_var(--tw-gradient-from)_66%,_var(--tw-gradient-to))] pr-0',
      },
    },
    hidden: {
      true: {
        scrollButton: 'hidden',
      },
    },
  },
});
