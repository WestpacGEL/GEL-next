/* eslint-disable better-tailwindcss/no-unregistered-classes */
import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'group m-0 border-none p-0',
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
      // Below ignored because tailwind was showing a transform error when using a const

      1: { input: 'inline-flex' },
      2: { input: 'inline-flex' },
      3: { input: 'inline-flex' },
      4: { input: 'inline-flex' },
      5: { input: 'inline-flex' },
      6: { input: 'inline-flex' },
      7: { input: 'inline-flex' },
      8: { input: 'inline-flex' },
      9: { input: 'inline-flex' },
      10: { input: 'inline-flex' },
      20: { input: 'inline-flex' },
      30: { input: 'inline-flex' },
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
});
