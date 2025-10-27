import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'flex-1 overflow-auto' },
    variants: {
      size: {
        full: { base: 'px-4 py-3' },
        lg: { base: 'px-12 pb-12' },
        md: { base: 'px-7 pb-7' },
        sm: { base: 'px-5 pb-7' },
        fluid: { base: 'px-5 pb-7' },
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
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
