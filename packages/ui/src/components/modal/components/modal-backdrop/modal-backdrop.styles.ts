import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'animate-fadeIn fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-2',
    modal: 'animate-fadeInDown relative top-3 z-10 h-fit w-full',
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
