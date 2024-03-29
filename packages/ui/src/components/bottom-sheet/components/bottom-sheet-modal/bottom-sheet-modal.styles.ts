import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      underlay:
        'fixed inset-0 z-10 flex animate-fadeIn flex-col justify-end bg-black/50 transition-all md:items-center md:justify-center',
      motionWrapper: 'flex flex-col',
      modal: 'flex w-full flex-col',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
