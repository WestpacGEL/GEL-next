import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'flex-1' },
    variants: {
      size: {
        full: { base: 'px-4 py-3' },
        lg: { base: 'px-12 pb-12' },
        md: { base: 'px-7 pb-7' },
        sm: { base: 'px-5 pb-7' },
        fluid: { base: 'px-5 pb-7' },
      },
      reducePadding: {
        true: '',
        false: '',
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
    },
    compoundSlots: [
      {
        slots: ['base'],
        size: ['lg', 'md'],
        reducePadding: true,
        className: 'px-5',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
