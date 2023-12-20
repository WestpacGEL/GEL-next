import { tv } from 'tailwind-variants';

import { INPUT_WIDTHS } from '../../constants/input-widths.js';

type InputWidthKeys = keyof typeof INPUT_WIDTHS;
const modifiedInputWidths = Object.entries(INPUT_WIDTHS).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: {
      ...(key === 'full' ? { outerWrapper: 'w-full' } : { outerWrapper: 'w-auto', base: 'items-start' }),
      input: value,
    },
  };
}, {} as Record<InputWidthKeys, any>);

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
      width: modifiedInputWidths,
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
