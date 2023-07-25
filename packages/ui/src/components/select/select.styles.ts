import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'form-control bg-no-repeat select-caret disabled:form-control-disabled focus:focus-outline',
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
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
