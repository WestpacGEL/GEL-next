import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: { base: 'flex-1 transition-shadow delay-0 duration-200 ease-[ease]' },
  variants: {
    size: {
      full: { base: 'px-4 py-3' },
      lg: { base: 'px-12 pb-12' },
      md: { base: 'px-7 pb-7' },
      sm: { base: 'px-5 pb-5' },
      fluid: { base: 'px-5 pb-5' },
    },
    canScroll: {
      true: {
        base: 'shadow-[-2px_-2px_5px_-2px_inset] shadow-black/30 dark:shadow-black/75',
      },
    },
    scrolled: {
      true: { base: 'shadow-[-2px_-2px_5px_-2px_inset,-2px_2px_5px_-2px_inset] shadow-black/30 dark:shadow-black/75' },
    },
    scrollAtBottom: {
      true: { base: 'shadow-[-2px_2px_5px_-2px_inset,0px_0px_0px_0px_inset]' },
    },
    compact: {
      true: '',
      false: '',
    },
    footerPresent: {
      true: '',
      false: '',
    },
  },
  compoundSlots: [
    {
      slots: ['base'],
      size: ['lg'],
      compact: true,
      className: 'overflow-y-auto px-5 pb-3',
    },
    {
      slots: ['base'],
      size: ['md'],
      compact: true,
      className: 'overflow-y-auto px-5 pb-2',
    },
    {
      slots: ['base'],
      size: ['md'],
      footerPresent: true,
      className: 'pb-5',
    },
    {
      slots: ['base'],
      size: ['lg'],
      footerPresent: true,
      className: 'pb-6',
    },
  ],
});
