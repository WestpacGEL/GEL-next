import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'relative justify-start flex',
    scrollButton: 'absolute resize-none h-5 rounded-none border-none border-l-white transition-all duration-100',
    arrowIconLeft: 'absolute text-hero -translate-y-2/4 -inset-x-1',
    arrowIconRight: 'absolute text-hero -translate-y-2/4 inset-x-1',
  },
  base: 'flex w-full gap-1 overflow-auto whitespace-nowrap scrollbar-thin',
});
