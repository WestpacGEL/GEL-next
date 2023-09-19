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
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
