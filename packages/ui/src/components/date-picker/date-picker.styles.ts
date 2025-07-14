import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      input: 'form-control flex items-center gap-1 overflow-hidden px-2 disabled:form-control-disabled',
      button:
        '-mr-2 flex h-auto items-center justify-center rounded-l-none border-l border-l-borderDark bg-light px-2 py-3',
    },
    variants: {
      size: {
        sm: {
          input: 'form-control-small',
          button: 'my-[-0.25rem] py-[0.25rem]',
        },
        md: {
          input: 'form-control-medium',
          button: 'my-[-0.3125rem] py-[0.3125rem]',
        },
        lg: {
          input: 'form-control-large',
          button: 'my-[-0.5rem] py-[0.5rem]',
        },
        xl: {
          input: 'form-control-xlarge',
          button: 'my-[-0.6875rem] py-[0.6875rem]',
        },
      },
      isInvalid: {
        true: {
          input: 'border-danger',
        },
        false: {},
      },
      isDisabled: {
        true: {
          input: 'form-control-disabled',
        },
        false: {},
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
