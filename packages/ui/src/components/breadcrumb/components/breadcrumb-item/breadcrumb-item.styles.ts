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
        true: 'text-text-10',
        false: 'text-text',
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
