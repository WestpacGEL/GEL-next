import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative flex flex-col',
      label: 'text-text block text-left text-sm font-medium',
      outerWrapper:
        'form-control disabled:form-control-disabled relative flex w-full flex-row items-center overflow-hidden pr-2',
      input: 'w-full appearance-none bg-[transparent] outline-none',
      clearButton: 'text-text-50 hover:text-border-60 flex cursor-default items-center justify-center',
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
      isFocused: {
        true: {
          outerWrapper: 'focus-outline',
        },
        false: {},
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
