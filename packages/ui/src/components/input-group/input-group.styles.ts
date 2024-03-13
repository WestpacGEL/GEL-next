import { tv } from 'tailwind-variants';

const inlineFlexInput = { input: 'inline-flex' };
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
      // Has to be done this as doing it with compoundVariants with array was not working
      width: {
        full: '',
        1: inlineFlexInput,
        2: inlineFlexInput,
        3: inlineFlexInput,
        4: inlineFlexInput,
        5: inlineFlexInput,
        6: inlineFlexInput,
        7: inlineFlexInput,
        8: inlineFlexInput,
        9: inlineFlexInput,
        10: inlineFlexInput,
        20: inlineFlexInput,
        30: inlineFlexInput,
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
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
