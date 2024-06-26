import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'relative flex justify-start',
    scrollButton: 'absolute h-5 resize-none rounded-none border-none border-l-white transition-all duration-100',
    arrowIconLeft: 'absolute -inset-x-1 -translate-y-2/4 text-hero opacity-100 hover:opacity-50',
    arrowIconRight: 'absolute inset-x-1 -translate-y-2/4 text-hero opacity-100 hover:opacity-50',
    filterButton: 'scroll-mx-20',
  },
  base: 'flex w-full gap-1 overflow-hidden whitespace-nowrap px-0.5',
});
