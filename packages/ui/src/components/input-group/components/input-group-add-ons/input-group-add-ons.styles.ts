import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'inset-y-0 text-text-body focus-within:z-20',
  variants: {
    isInset: {
      true: 'absolute',
      false: '',
    },
    position: {
      before: 'group/add-on-before',
      after: 'group/add-on-after',
    },
  },
  compoundVariants: [
    {
      isInset: true,
      position: 'before',
      className: 'left-0 z-[11]',
    },
    {
      isInset: true,
      position: 'after',
      className: 'right-0 z-[11]',
    },
  ],
});
