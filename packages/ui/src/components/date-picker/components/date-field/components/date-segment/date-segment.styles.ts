import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'rounded-sm font-light text-text-body disabled:form-control-disabled',
    variants: {
      isPlaceholder: {
        true: 'text-text-muted/50 opacity-100',
        false: '',
      },
      isFocusVisible: {
        true: 'focus-outline',
        false: '',
      },
      isSeparator: {
        true: 'px-0.5 text-text-body-50[REPLACE_TOKEN]',
        false: '',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
