import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'form-control w-full rounded-xl read-only:form-control-disabled disabled:form-control-disabled',
  variants: {
    size: {
      small: 'min-h-9 form-control-small',
      medium: 'min-h-9 form-control-medium',
      large: 'min-h-11 form-control-large',
      xlarge: 'min-h-12 form-control-xlarge',
    },
    invalid: {
      true: 'border-border-danger',
      false: 'border-border-muted-strong',
    },
    isFocusVisible: {
      true: '!focus-outline', // needs to overwrite outline-none on form-control style because of transition
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
});
