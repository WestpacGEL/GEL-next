import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative flex justify-start',
    buttonList: 'flex w-full touch-pan-x gap-1 overflow-x-auto overflow-y-visible whitespace-nowrap py-1',
    scrollButton: 'absolute top-0 bottom-0 h-auto rounded-none contrast-more:bg-black',
  },
  variants: {
    position: {
      left: {
        scrollButton: '-left-1 bg-[linear-gradient(90deg,_#fff_66%,_transparent)] pl-0',
      },
      right: {
        scrollButton: '-right-1 bg-[linear-gradient(270deg,_#fff_66%,_transparent)] pr-0',
      },
    },
    hidden: {
      true: {
        scrollButton: 'hidden',
      },
    },
  },
});
