import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'form-control w-full read-only:form-control-disabled disabled:form-control-disabled',
    variants: {
      size: {
        small: 'form-control-small min-h-9',
        medium: 'form-control-medium min-h-9',
        large: 'form-control-large min-h-11',
        xlarge: 'form-control-xlarge min-h-12',
      },
      invalid: {
        true: 'border-border-danger',
        false: 'border-border-muted-strong',
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
