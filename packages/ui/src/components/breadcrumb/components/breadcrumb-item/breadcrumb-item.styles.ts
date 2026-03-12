import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'text-[0.8125rem] text-text-body',
  variants: {
    isCurrent: {
      true: 'text-text-muted',
      false: '',
    },
    isDisabled: {
      true: 'text-text-muted',
      false: '',
    },
  },
  compoundVariants: [
    {
      isCurrent: false,
      isDisabled: false,
      className: 'cursor-pointer hover:underline',
    },
  ],
});
