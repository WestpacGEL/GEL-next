import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'relative flex justify-start',
    scrollButtonLeft: '',
    scrollButtonRight: '',
    arrowIconLeft: '-inset-x-1',
    arrowIconRight: 'inset-x-1',
    filterButton: 'scroll-mx-5',
  },
  base: 'flex w-full touch-pan-x gap-1 overflow-x-auto whitespace-nowrap',
  variants: {
    isScrollableRight: {
      true: '',
      false: '',
    },
    isScrollableLeft: {
      true: '',
      false: '',
    },
  },
  compoundSlots: [
    {
      slots: ['arrowIconLeft', 'arrowIconRight'],
      class: 'absolute -translate-y-2/4 text-hero opacity-100 hover:opacity-50',
    },
    {
      slots: ['scrollButtonLeft'],
      class:
        'hover:bg-[linear-gradient(90deg,_#fff_66%,_transparent) left-0 border-l-white bg-[linear-gradient(90deg,_#fff_66%,_transparent)] transition-all duration-100 active:bg-[linear-gradient(90deg,_#fff_66%,_transparent)]',
    },
    {
      slots: ['scrollButtonRight'],
      class:
        'right-0 border-l-white bg-[linear-gradient(270deg,_#fff_66%,_transparent)] transition-all duration-100 hover:bg-[linear-gradient(270deg,_#fff_66%,_transparent)] active:bg-[linear-gradient(270deg,_#fff_66%,_transparent)]',
    },
    {
      slots: ['scrollButtonLeft', 'scrollButtonRight'],
      class:
        'invisible absolute h-5 resize-none rounded-none border-none transition-all duration-100 contrast-more:bg-black',
    },
    {
      slots: ['scrollButtonLeft'],
      isScrollableLeft: true,
      class: 'visible',
    },
    {
      slots: ['scrollButtonRight'],
      isScrollableRight: true,
      class: 'visible',
    },
  ],
});
