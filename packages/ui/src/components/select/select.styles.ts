import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'form-control bg-no-repeat select-caret disabled:form-control-disabled group-[.add-on-after]:!rounded-r group-[.add-on-after]:rounded-l-none group-[.add-on-before]:!rounded-l group-[.add-on-before]:rounded-r-none group-[.input-field-after]:rounded-r-none group-[.input-field-before]:rounded-l-none group-[.add-on-after]:!border-x group-[.add-on-before]:!border-x group-[.input-field-after]:border-r-0 group-[.input-field-before]:border-l-0',
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
      width: {
        auto: 'flex-1',
        full: 'w-full flex-1',
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
