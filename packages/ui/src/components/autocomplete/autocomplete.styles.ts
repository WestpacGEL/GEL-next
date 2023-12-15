import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative flex flex-col',
      label: 'block text-left text-sm font-medium text-text',
      outerWrapper:
        'form-control relative flex w-full flex-row items-stretch overflow-hidden pr-2 disabled:form-control-disabled',
      input: 'w-full appearance-none bg-[transparent] outline-none',
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
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
