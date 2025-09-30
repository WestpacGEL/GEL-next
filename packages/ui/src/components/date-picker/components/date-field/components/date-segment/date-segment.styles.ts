import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'text-text-body disabled:form-control-disabled rounded-sm font-light',
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
      true: 'text-text-body/50 px-0.5',
      false: '',
    },
  },
});
