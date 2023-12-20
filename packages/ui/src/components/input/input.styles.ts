import { tv } from 'tailwind-variants';

import { INPUT_WIDTHS } from '../../constants/input-widths.js';

export const styles = tv(
  {
    base: 'form-control flex-1 read-only:form-control-disabled disabled:form-control-disabled group-[.input-field-after]:rounded-r-none group-[.input-field-before]:rounded-l-none group-[.input-field-after]:border-r-0 group-[.input-field-before]:border-l-0',
    variants: {
      size: {
        small: 'form-control-small group-[.input-field-inset-after]:pr-6 group-[.input-field-inset-before]:pl-6',
        medium: 'form-control-medium group-[.input-field-inset-after]:pr-7 group-[.input-field-inset-before]:pl-7',
        large: 'form-control-large group-[.input-field-inset-after]:pr-8 group-[.input-field-inset-before]:pl-8',
        xlarge: 'form-control-xlarge group-[.input-field-inset-after]:pr-9 group-[.input-field-inset-before]:pl-9',
      },
      invalid: {
        true: 'border-danger',
        false: 'border-borderDark',
      },
      isFocusVisible: {
        true: 'focus-outline',
      },
      isFocused: {
        true: 'outline-none',
      },
      width: INPUT_WIDTHS,
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
