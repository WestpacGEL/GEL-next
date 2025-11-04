import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'bg-surface-muted-pale sm:text-text-mono relative overflow-hidden pb-7 text-center antialiased sm:pb-11',
    heading: 'typography-brand-4 sm:typography-brand-1 sm:text-text-reversed mt-15 !leading-none sm:mt-7',
  },
  variants: {
    brand: {
      wbc: {
        base: 'before:bg-surface-pop sm:bg-background-primary before:absolute before:top-15 before:bottom-0 before:left-0 before:block before:w-2 sm:before:w-4',
        heading: 'text-[3rem] uppercase sm:text-[4.5rem]',
      },
      stg: {
        base: 'sm:bg-background-hero',
        heading: 'text-text-hero',
      },
      bom: {
        base: 'sm:bg-background-hero',
      },
      bsa: {
        base: 'from-background-hero via-[#00468e] to-[#00adbd] sm:bg-gradient-to-r',
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
