import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      input: 'form-control flex items-center border-borderDark disabled:form-control-disabled',
      button:
        'flex h-auto items-center justify-center rounded-l-none border-y-0 border-l border-r-0 border-l-borderDark bg-light',
    },
    variants: {
      size: {
        small: {
          input: 'form-control-small max-h-5 gap-1.5',
          button: '-mr-1.5 min-h-[1.75rem]', // height enough to fit inside the border of parent
        },
        medium: {
          input: 'form-control-medium max-h-6 gap-2',
          button: '-mr-2 min-h-[2.125rem]',
        },
        large: {
          input: 'form-control-large max-h-7 gap-2.5',
          button: '-mr-2.5 min-h-[2.5rem]',
        },
        xlarge: {
          input: 'form-control-xlarge max-h-8 gap-3',
          button: '-mr-3 min-h-[2.875rem]',
        },
      },
      block: {
        true: {
          input: 'w-full justify-between gap-0',
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
