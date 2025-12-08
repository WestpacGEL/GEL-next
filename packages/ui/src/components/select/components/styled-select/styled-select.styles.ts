import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'form-control overflow-hidden overflow-ellipsis whitespace-nowrap bg-no-repeat select-caret disabled:form-control-disabled group-first/add-on-before:!rounded-l group-first/add-on-before:rounded-r-none group-first/add-on-before:!border-x group-last/add-on-after:!rounded-r group-last/add-on-after:rounded-l-none group-last/add-on-after:!border-x group-[.input-group-after]:rounded-r-none group-[.input-group-before]:rounded-l-none group-[.input-group-after]:border-r-0 group-[.input-group-before]:border-l-0',
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
