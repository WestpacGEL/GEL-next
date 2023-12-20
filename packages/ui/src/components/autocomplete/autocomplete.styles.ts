import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative flex flex-1 flex-col',
      label: 'block text-left text-sm font-medium text-text',
      outerWrapper:
        'form-control relative flex flex-1 flex-row items-stretch overflow-hidden pr-2 disabled:form-control-disabled group-[.input-field-after]:rounded-r-none group-[.input-field-before]:rounded-l-none group-[.input-field-after]:border-r-0 group-[.input-field-before]:border-l-0',
      input: 'appearance-none bg-[transparent] outline-none',
      clearButton: 'flex cursor-default items-center justify-center text-text-50 hover:text-border-60',
      iconWrapper: 'flex flex-col justify-center',
    },
    variants: {
      invalid: {
        true: {
          outerWrapper: 'border-danger',
        },
        false: {
          outerWrapper: 'border-borderDark',
        },
      },
      size: {
        small: {
          input: 'form-control-small',
          iconWrapper: 'pl-1',
        },
        medium: {
          input: 'form-control-medium',
          iconWrapper: 'pl-1.5',
        },
        large: {
          input: 'form-control-large',
          iconWrapper: 'pl-1.5',
        },
        xlarge: {
          input: 'form-control-xlarge',
          iconWrapper: 'pl-2',
        },
      },
      isDisabled: {
        true: {
          outerWrapper: 'form-control-disabled',
          input: 'cursor-not-allowed',
        },
        false: {},
      },
      isFocusVisible: {
        true: {
          clearButton: 'focus-outline',
        },
        false: {},
      },
      isInputFocusVisible: {
        true: {
          outerWrapper: 'focus-outline',
        },
        false: {},
      },
      width: {
        // eslint-disable-next-line sonarjs/no-duplicate-string
        1: { outerWrapper: 'w-auto', base: 'items-start', input: 'box-content w-[1.81ex]' },
        2: { outerWrapper: 'w-auto', base: 'items-start', input: 'box-content w-[3.62ex]' },
        3: { outerWrapper: 'w-auto', base: 'items-start', input: 'box-content w-[5.43ex]' },
        4: { outerWrapper: 'w-auto', base: 'items-start', input: 'box-content w-[7.24ex]' },
        5: { outerWrapper: 'w-auto', base: 'items-start', input: 'box-content w-[9.05ex]' },
        6: { outerWrapper: 'w-auto', base: 'items-start', input: 'box-content w-[10.86ex]' },
        7: { outerWrapper: 'w-auto', base: 'items-start', input: 'box-content w-[12.67ex]' },
        8: { outerWrapper: 'w-auto', base: 'items-start', input: 'box-content w-[14.48ex]' },
        9: { outerWrapper: 'w-auto', base: 'items-start', input: 'box-content w-[16.29ex]' },
        10: { outerWrapper: 'w-auto', base: 'items-start', input: 'box-content w-[18.1ex]' },
        20: { outerWrapper: 'w-auto', base: 'items-start', input: 'box-content w-[36.2ex]' },
        30: { outerWrapper: 'w-auto', base: 'items-start', input: 'box-content w-[54.3ex]' },
        full: { outerWrapper: 'w-full', input: 'w-full' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
