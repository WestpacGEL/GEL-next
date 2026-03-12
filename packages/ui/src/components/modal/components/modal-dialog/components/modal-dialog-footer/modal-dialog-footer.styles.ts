import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'flex gap-1 rounded-b-3xl bg-background-white',
    primaryBtn: '',
    secondaryBtn: '',
  },
  variants: {
    size: {
      full: { base: 'px-4 pb-3' },
      lg: { base: 'px-12 pb-12' },
      md: { base: 'px-7 pb-7' },
      sm: { base: 'flex-col px-5 pb-5' },
      fluid: { base: 'px-5 pb-5 max-md:flex-col' },
    },
    compact: {
      true: '',
      false: '',
    },
  },
  compoundSlots: [
    {
      slots: ['base'],
      size: ['lg', 'md'],
      compact: true,
      className: 'min-h-[90px] px-5 pt-3 pb-5',
    },
  ],
});
