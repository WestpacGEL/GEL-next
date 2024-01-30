import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'group m-0 mb-5 border-none p-0',
      input: 'relative flex',
    },
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
      width: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        after: true,
        afterInset: false,
        className: { base: 'input-group-after' },
      },
      {
        before: true,
        beforeInset: false,
        className: { base: 'input-group-before' },
      },
      {
        after: true,
        afterInset: true,
        className: { base: 'input-group-inset-after' },
      },
      {
        before: true,
        beforeInset: true,
        className: { base: 'input-group-inset-before' },
      },
      {
        width: true,
        className: {
          input: 'inline-flex',
        },
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
