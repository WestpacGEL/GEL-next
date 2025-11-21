import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex gap-1 rounded-b-[3px] bg-white',
      primaryBtn: '',
      secondaryBtn: '',
    },
    variants: {
      size: {
        full: { base: 'px-4 py-3' },
        lg: { base: 'px-12 pb-12 pt-6' },
        md: { base: 'px-7 pb-7 pt-2' },
        sm: { base: 'flex-col px-5 pb-5 pt-2' },
        fluid: { base: 'px-5 pb-5 pt-2 max-md:flex-col' },
      },
      canScroll: {
        true: {
          base: 'pb-5',
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
        size: ['lg', 'md'],
        compact: true,
        className: 'min-h-[90px] px-5 pb-5 pt-3',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
