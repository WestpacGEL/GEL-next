import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative -left-1 flex justify-start', // left positioning for padding on buttons to show focus ring but be aligned to input
    buttonList: 'flex w-full touch-pan-x gap-1 overflow-y-visible overflow-x-scroll whitespace-nowrap p-1',
    scrollButton: 'absolute inset-y-0 h-auto rounded-none contrast-more:bg-black',
  },
  variants: {
    position: {
      left: {
        scrollButton: 'left-0 bg-[linear-gradient(90deg,_#fff_66%,_transparent)] pl-0',
      },
      right: {
        scrollButton: '-right-2 bg-[linear-gradient(270deg,_#fff_66%,_transparent)] pr-0',
      },
    },
    hidden: {
      true: {
        scrollButton: 'hidden',
      },
    },
  },
});
