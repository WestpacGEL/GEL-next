import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative flex flex-col',
      label: 'block text-left text-sm font-medium text-text',
      outerWrapper:
        'form-control relative flex w-full flex-row items-center overflow-hidden pr-2 disabled:form-control-disabled',
      input: 'w-full appearance-none bg-[transparent] outline-none',
      clearButton: 'flex cursor-default items-center justify-center text-text-50 hover:text-border-60',
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
        },
        medium: {
          input: 'form-control-medium',
        },
        large: {
          input: 'form-control-large',
        },
        xlarge: {
          input: 'form-control-xlarge',
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
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
