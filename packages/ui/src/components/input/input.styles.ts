import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'form-control read-only:form-control-disabled disabled:form-control-disabled focus:focus-outline',
    variants: {
      size: {
        small: 'form-control-small',
        medium: 'form-control-medium',
        large: 'form-control-large',
        xlarge: 'form-control-xlarge',
      },
      invalid: {
        true: 'border-danger',
        false: 'border-borderDark',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
