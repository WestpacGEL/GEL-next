import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'text-[0.8125rem]',
    variants: {
      isCurrent: {
        true: '',
        false: '',
      },
      isDisabled: {
        true: 'text-muted-100',
        false: 'text-muted',
      },
    },
    compoundVariants: [
      {
        isCurrent: false,
        isDisabled: false,
        className: 'cursor-pointer hover:underline',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
