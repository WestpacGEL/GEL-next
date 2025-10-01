import { tv } from 'tailwind-variants';

// scroll margin top = header height + 24px
export const styles = tv({
  base: 'text-text-heading mt-5 scroll-mt-[9.125rem] font-bold first:mt-0 md:scroll-mt-30',
  variants: {
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      end: 'text-right',
    },
    level: {
      1: 'typography-body-5 mb-3',
      2: 'typography-body-7 sm:typography-body-6 mb-4 sm:mb-7',
      3: 'typography-body-8 mb-2',
      4: 'typography-body-10 mb-2 uppercase',
      5: 'typography-body-9 mb-2',
      6: 'typography-body-10 mb-2',
    },
  },
});
