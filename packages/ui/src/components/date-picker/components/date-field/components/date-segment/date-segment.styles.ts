import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'rounded-sm text-text-body focus:focus-outline disabled:form-control-disabled',
  variants: {
    isFocusVisible: {
      true: 'focus-outline',
      false: '',
    },
    isSeparator: {
      true: 'px-0.5 text-text-body',
      false: '',
    },
  },
});
