import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'fixed inset-0 flex animate-fadeIn justify-center overflow-y-auto bg-black/50 p-2',
    modal: 'relative top-[5vh] z-10 size-fit max-w-full animate-fadeInDown pb-[5vh]',
  },
  variants: {
    fullscreen: {
      true: {
        modal: 'top-0 flex flex-1 flex-col p-0',
        base: 'flex flex-col p-0',
      },
    },
    fluid: {
      true: {
        modal: 'mx-2',
      },
    },
  },
});
