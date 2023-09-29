import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'group m-0 mb-5 border-none p-0',
    variants: {
      before: {
        true: '',
        false: '',
      },
      after: {
        true: '',
        false: '',
      },
      beforeInset: {
        true: '',
        false: '',
      },
      afterInset: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        after: true,
        afterInset: false,
        className: 'input-field-after',
      },
      {
        before: true,
        beforeInset: false,
        className: 'input-field-before',
      },
      {
        after: true,
        afterInset: true,
        className: 'input-field-inset-after',
      },
      {
        before: true,
        beforeInset: true,
        className: 'input-field-inset-before',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
