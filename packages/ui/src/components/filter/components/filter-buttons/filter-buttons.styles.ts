import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'relative flex justify-start',
    scrollButtonLeft:
      'absolute h-5 resize-none rounded-none border-none border-l-white transition-all duration-100 contrast-more:bg-black left-0 bg-[linear-gradient(90deg,_#fff_66%,_transparent)] hover:bg-[linear-gradient(90deg,_#fff_66%,_transparent)]',
    scrollButtonLeftHidden:
      'absolute h-5 resize-none rounded-none border-none border-l-white transition-all duration-100 contrast-more:bg-black left-0 bg-[linear-gradient(90deg,_#fff_66%,_transparent)] hover:bg-[linear-gradient(90deg,_#fff_66%,_transparent)] invisible',
    scrollButtonRight:
      'absolute h-5 resize-none rounded-none border-none border-l-white transition-all duration-100 contrast-more:bg-black right-0 bg-[linear-gradient(270deg,_#fff_66%,_transparent)] hover:bg-[linear-gradient(270deg,_#fff_66%,_transparent)]',
    scrollButtonRightHidden:
      'absolute h-5 resize-none rounded-none border-none border-l-white transition-all duration-100 contrast-more:bg-black right-0 bg-[linear-gradient(270deg,_#fff_66%,_transparent)] hover:bg-[linear-gradient(270deg,_#fff_66%,_transparent)] invisible',
    arrowIconLeft: 'absolute -inset-x-1 -translate-y-2/4 text-hero opacity-100 hover:opacity-50',
    arrowIconRight: 'absolute inset-x-1 -translate-y-2/4 text-hero opacity-100 hover:opacity-50',
    filterButton: 'scroll-mx-5',
  },
  base: 'flex w-full touch-pan-x gap-1 overflow-x-auto whitespace-nowrap',
});
