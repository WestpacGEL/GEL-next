import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'fixed inset-0 flex animate-fadeIn justify-center  bg-black/50 p-2',
    modal: 'relative z-10 size-fit max-w-full animate-fadeInDown ',
  },
  variants: {
    fullscreen: {
      true: {
        modal: 'top-0 flex flex-1 flex-col p-0',
        base: 'flex flex-col p-0',
      },
      false: {
        modal: 'top-[5vh]',
      },
    },
    fluid: {
      true: {
        modal: 'mx-2',
      },
    },
    compact: {
      true: '',
      false: '',
    },
  },
  compoundSlots: [
    {
      slots: ['base'],
      fullscreen: false,
      compact: false,
      className: 'overflow-y-auto',
    },
    {
      slots: ['modal'],
      fullscreen: false,
      compact: false,
      className: 'pb-[5vh]',
    },
  ],
});
