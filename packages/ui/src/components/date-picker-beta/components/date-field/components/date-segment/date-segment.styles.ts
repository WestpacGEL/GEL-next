import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'uppercase disabled:form-control-disabled focus:focus-outline',
    variants: {
      isFocusVisible: {
        true: 'focus-outline',
        false: '',
      },
      isSeparator: {
        true: 'px-0.5 text-text',
        false: '',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
