import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    underlay:
      'animate-fadeIn fixed inset-0 flex flex-col justify-end bg-black/50 transition-all md:items-center md:justify-center',
    motionWrapper: 'flex flex-col',
    modal: 'flex w-full flex-col',
  },
});
