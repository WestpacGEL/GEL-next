import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'fixed inset-x-0 top-0 z-20 flex h-11 overflow-hidden text-white sm:static sm:pl-2 lg:left-[18.75rem] lg:pl-5',
    heading: 'z-10 flex grow items-center sm:border-b sm:border-white/70',
  },
  variants: {
    brand: {
      wbc: { base: 'bg-primary' },
      stg: { base: 'bg-hero' },
      bom: { base: 'bg-hero' },
      bsa: { base: 'bg-gradient-to-r from-hero via-[#00468e] to-[#00adbd]' },
      wbg: { base: 'sm:bg-hero' },
      rams: { base: 'sm:bg-primary' },
      btfg: {},
    },
    fixed: {
      true: { base: 'shadow-[0_2px_5px_rgba(0,0,0,0.3)] sm:fixed', heading: 'border-none' },
    },
  },
});
