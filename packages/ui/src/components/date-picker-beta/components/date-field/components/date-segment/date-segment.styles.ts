import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'font-light disabled:form-control-disabled',
    variants: {
      isPlaceholder: {
        true: 'text-text-50 opacity-100',
        false: '',
      },
      isFocusVisible: {
        true: 'focus-outline',
        false: '',
      },
      isSeparator: {
        true: 'px-0.5 text-text-50',
        false: '',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
