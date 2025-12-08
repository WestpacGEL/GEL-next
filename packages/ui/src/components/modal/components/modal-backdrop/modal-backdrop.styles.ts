import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'fixed inset-0 flex animate-fadeIn justify-center bg-black/50 px-4',
      modal: 'relative top-[5vh] z-10 size-fit max-w-full animate-fadeInDown',
    },
    variants: {
      size: {
        fluid: { base: 'px-4' },
        full: {
          modal: '!top-0 flex w-full flex-1 flex-col p-0',
          base: 'flex flex-col p-0',
        },
        lg: '',
        md: '',
        sm: '',
      },
      compact: {
        true: '',
        false: '',
      },
    },
    compoundSlots: [
      {
        slots: ['base'],
        size: ['sm', 'md', 'lg', 'fluid'],
        compact: false,
        className: 'overflow-y-auto',
      },
      {
        slots: ['modal'],
        size: ['sm', 'md', 'lg', 'fluid'],
        compact: false,
        className: 'pb-[5vh]',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
