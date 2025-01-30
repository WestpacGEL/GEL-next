import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'date-picker',
    variants: {
      size: {
        sm: 'date-picker-sm',
        md: 'date-picker-md',
        lg: 'date-picker-lg',
        xl: 'date-picker-xl',
      },
      block: {
        true: 'date-picker-block',
        false: '',
      },
      invalid: {
        true: 'date-picker-invalid',
        false: '',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
