import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'fixed inset-0 flex animate-fadeIn items-center justify-center overflow-y-auto bg-black/50 p-2',
    modal: 'relative z-10 h-fit w-full animate-fadeInDown',
  },
  variants: {
    fullscreen: {
      true: {
        modal: 'top-0 flex flex-1 flex-col',
        base: 'flex flex-col p-0',
      },
    },
    fluid: {
      true: {
        modal: 'px-2',
      },
    },
  },
});
