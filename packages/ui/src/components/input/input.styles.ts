import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'form-control flex-1 group-[.input-group-after]:rounded-r-none group-[.input-group-after]:border-r-0 group-[.input-group-before]:rounded-l-none group-[.input-group-before]:border-l-0 read-only:form-control-disabled disabled:form-control-disabled',
  variants: {
    size: {
      small: 'form-control-small group-[.input-group-inset-after]:pr-6 group-[.input-group-inset-before]:pl-6',
      medium: 'form-control-medium group-[.input-group-inset-after]:pr-7 group-[.input-group-inset-before]:pl-7',
      large: 'form-control-large group-[.input-group-inset-after]:pr-8 group-[.input-group-inset-before]:pl-8',
      xlarge: 'form-control-xlarge group-[.input-group-inset-after]:pr-9 group-[.input-group-inset-before]:pl-9',
    },
    invalid: {
      true: 'border-border-danger',
      false: 'border-border-muted-strong',
    },
    isFocusVisible: {
      true: 'focus-outline',
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
});
