import { tv } from 'tailwind-variants';

// scroll margin top = header height + 24px
export const styles = tv({
  base: `
    mt-5 scroll-mt-[9.125rem] font-bold text-text-heading
    first:mt-0
    md:scroll-mt-30
  `,
  variants: {
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      end: 'text-right',
    },
    level: {
      1: 'mb-3 typography-body-5',
      2: `
        mb-4 typography-body-7
        sm:mb-7 sm:typography-body-6
      `,
      3: 'mb-2 typography-body-8',
      4: 'mb-2 typography-body-10 uppercase',
      5: 'mb-2 typography-body-9',
      6: 'mb-2 typography-body-10',
    },
  },
});
