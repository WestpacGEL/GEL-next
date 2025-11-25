import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'flex-1' },
    variants: {
      size: {
        full: { base: 'px-4 py-3' },
        lg: { base: 'px-12 pb-6' },
        md: { base: 'px-7 pb-5' },
        sm: { base: 'px-5 pb-5' },
        fluid: { base: 'px-5 pb-5' },
      },
      canScroll: {
        true: {
          base: ' shadow-[0_-6px_6px_0_inset] shadow-border',
        },
      },
      scrolled: {
        true: { base: ' shadow-[0_-6px_6px_0_inset,0_6px_6px_0_inset] shadow-border' },
      },
      scrollAtBottom: {
        true: { base: 'shadow-[0_6px_6px_0_inset,0_0_0_0_inset]' },
      },
      compact: {
        true: '',
        false: '',
      },
    },
    compoundSlots: [
      {
        slots: ['base'],
        size: ['lg'],
        compact: true,
        className: 'overflow-y-scroll px-5 pb-3',
      },
      {
        slots: ['base'],
        size: ['md'],
        compact: true,
        className: 'overflow-y-scroll px-5 pb-2',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
