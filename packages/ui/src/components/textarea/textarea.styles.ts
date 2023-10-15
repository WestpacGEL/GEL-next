import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'form-control w-full read-only:form-control-disabled disabled:form-control-disabled',
    variants: {
      size: {
        small: 'form-control-small min-h-[3.375rem]',
        medium: 'form-control-medium min-h-[3.375rem]',
        large: 'form-control-large min-h-[4.125rem]',
        xlarge: 'form-control-xlarge min-h-[4.5rem]',
      },
      invalid: {
        true: 'border-danger',
        false: 'border-borderDark',
      },
      isFocused: {
        true: 'focus-outline',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
