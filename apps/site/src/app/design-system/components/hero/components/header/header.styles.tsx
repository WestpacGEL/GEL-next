import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: `
      fixed inset-x-0 top-0 z-20 flex h-11 items-center overflow-hidden
      text-text-mono
      sm:static sm:pl-2
      lg:left-[18.75rem] lg:pl-5
    `,
    heading: 'z-10 flex h-full grow items-center sm:border-b sm:border-border-mono',
  },
  variants: {
    brand: {
      wbc: { base: 'bg-background-primary' },
      stg: { base: 'bg-background-hero' },
      bom: { base: 'bg-background-hero' },
      bsa: {
        base: `bg-gradient-to-r from-background-hero via-[#00468e] to-[#00adbd]`,
      },
      btfg: {},
    },
    fixed: {
      true: {
        base: `
          shadow-[0_2px_5px_rgba(0,0,0,0.3)]
          sm:fixed
        `,
        heading: `border-none`,
      },
    },
  },
});
