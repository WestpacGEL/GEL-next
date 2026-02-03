import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      input: 'form-control flex items-center border-0',
      dateField: 'rounded rounded-r-none border border-r-0 border-borderDark',
      button: 'flex items-center justify-center rounded-l-none border-borderDark bg-light',
    },
    variants: {
      size: {
        small: {
          input: 'max-h-5',
          dateField: 'form-control-small h-5',
        },
        medium: {
          input: 'max-h-6',
          dateField: 'form-control-medium h-6',
        },
        large: {
          input: 'max-h-7',
          dateField: 'form-control-large h-7',
        },
        xlarge: {
          input: 'max-h-8',
          dateField: 'form-control-xlarge h-8',
        },
      },
      block: {
        true: {
          input: 'w-full gap-0',
          dateField: 'w-full',
        },
      },
      isInvalid: {
        true: {
          dateField: 'border-danger',
          button: 'border-danger border-l-borderDark',
        },
        false: {},
      },
      isDisabled: {
        true: {
          dateField: 'form-control-disabled',
        },
        false: {},
      },
      isReadOnly: {
        true: {
          dateField: 'form-control-disabled',
        },
        false: {},
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
