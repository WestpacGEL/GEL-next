import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative overflow-hidden bg-surface-muted-pale pb-7 text-center antialiased sm:pb-11 sm:text-text-mono',
    heading: 'typography-brand-4 mt-15 !leading-none sm:typography-brand-1 sm:mt-7 sm:text-text-reversed',
  },
  variants: {
    brand: {
      wbc: {
        base: 'before:absolute before:bottom-0 before:left-0 before:top-15 before:block before:w-2 before:bg-pop sm:bg-background-primary sm:before:w-4',
        heading: 'text-[3rem] uppercase sm:text-[4.5rem]',
      },
      stg: {
        base: 'sm:bg-surface-hero',
        heading: 'text-text-hero',
      },
      bom: {
        base: 'sm:bg-surface-hero',
      },
      bsa: {
        base: 'from-hero via-[#00468e] to-[#00adbd] sm:bg-gradient-to-r',
      },
      wbg: {
        base: 'sm:bg-surface-hero',
      },
      rams: {
        base: 'sm:bg-surface-primary',
      },
      btfg: {},
    },
  },
});
