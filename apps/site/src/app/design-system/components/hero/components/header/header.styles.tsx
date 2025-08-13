import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'fixed inset-x-0 top-0 z-20 flex h-11 overflow-hidden text-text-mono sm:static sm:pl-2 lg:left-[18.75rem] lg:pl-5',
    heading: 'z-10 flex grow items-center sm:border-b sm:border-border-mono/70',
  },
  variants: {
    brand: {
      wbc: { base: 'bg-surface-primary' },
      stg: { base: 'bg-surface-hero' },
      bom: { base: 'bg-surface-hero' },
      bsa: { base: 'bg-gradient-to-r from-hero via-[#00468e] to-[#00adbd]' },
      wbg: { base: 'bg-surface-hero' },
      rams: { base: 'bg-surface-primary' },
      btfg: {},
    },
    fixed: {
      true: { base: 'shadow-[0_2px_5px_rgba(0,0,0,0.3)] sm:fixed', heading: 'border-none' },
    },
  },
});
