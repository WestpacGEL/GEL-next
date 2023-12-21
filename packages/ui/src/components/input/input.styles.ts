import { tv } from 'tailwind-variants';

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
      width: {
        full: 'w-full',
        1: 'box-content w-[1.81ex]',
        2: 'box-content w-[3.62ex]',
        3: 'box-content w-[5.43ex]',
        4: 'box-content w-[7.24ex]',
        5: 'box-content w-[9.05ex]',
        6: 'box-content w-[10.86ex]',
        7: 'box-content w-[12.67ex]',
        8: 'box-content w-[14.48ex]',
        9: 'box-content w-[16.29ex]',
        10: 'box-content w-[18.1ex]',
        20: 'box-content w-[36.2ex]',
        30: 'box-content w-[54.3ex]',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
