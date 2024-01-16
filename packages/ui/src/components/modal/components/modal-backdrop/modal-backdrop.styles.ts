import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'fixed inset-0 z-50 flex animate-fadeIn justify-center overflow-y-auto bg-black/50 p-2',
    modal: 'relative top-5 z-10 h-fit w-full animate-fadeInDown',
  },
  variants: {
    fullSize: {
      true: {
        modal: 'top-0 flex flex-1 flex-col',
        base: 'flex flex-col p-0',
      },
    },
  },
});
