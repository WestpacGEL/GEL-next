import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: `
      relative overflow-hidden bg-surface-muted-pale pb-7 text-center
      antialiased
      sm:pb-11 sm:text-text-mono
    `,
    heading: `
      mt-15 typography-brand-4 !leading-none
      sm:mt-7 sm:typography-brand-1 sm:text-text-reversed
    `,
  },
  variants: {
    brand: {
      wbc: {
        base: `
          before:absolute before:top-15 before:bottom-0 before:left-0
          before:block before:w-2 before:bg-surface-pop
          sm:bg-background-primary sm:before:w-4
        `,
        heading: `
          text-[3rem] uppercase
          sm:text-[4.5rem]
        `,
      },
      stg: {
        base: 'sm:bg-background-hero',
        heading: 'text-text-hero',
      },
      bom: {
        base: 'sm:bg-background-hero',
      },
      bsa: {
        base: `
          from-background-hero via-[#00468e] to-[#00adbd]
          sm:bg-gradient-to-r
        `,
      },
      wbg: {
        base: 'sm:bg-background-hero',
      },
      rams: {
        base: 'sm:bg-background-primary',
      },
      btfg: {},
    },
  },
});
