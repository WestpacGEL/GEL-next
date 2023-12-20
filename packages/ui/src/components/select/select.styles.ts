import { tv } from 'tailwind-variants';

import { INPUT_WIDTHS } from '../../constants/input-widths.js';

export const styles = tv(
  {
    base: 'form-control bg-no-repeat select-caret disabled:form-control-disabled group-[.add-on-after]:rounded-l-none group-[.add-on-before]:rounded-r-none group-[.input-field-after]:rounded-r-none group-[.input-field-before]:rounded-l-none group-[.input-field-after]:border-r-0 group-[.input-field-before]:border-l-0',
    variants: {
      size: {
        small: 'form-control-small bg-[right_0.5625rem_center] pr-[calc(0.5rem+14px+0.5625rem)]',
        medium: 'form-control-medium bg-[right_0.75rem_center] pr-[calc(0.5rem+14px+0.75rem)]',
        large: 'form-control-large bg-[right_0.9375rem_center] pr-[calc(0.5rem+14px+0.9375rem)]',
        xlarge: 'form-control-xlarge bg-[right_1.125rem_center] pr-[calc(0.5rem+14px+1.125rem)]',
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
