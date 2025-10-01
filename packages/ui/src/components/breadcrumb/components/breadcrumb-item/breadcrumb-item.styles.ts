import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'text-text-body text-[0.8125rem]',
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
