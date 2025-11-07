import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'relative block min-w-7 border border-border-muted-soft px-2 py-1.5 text-center typography-body-10 text-text-body',
  variants: {
    isFocusVisible: {
      true: 'z-10 focus-outline',
      false: '',
    },
    firstItem: {
      true: 'rounded-l-md',
      false: 'ml-[-1px]',
    },
    lastItem: {
      true: 'rounded-r-md',
      false: '',
    },
    active: {
      true: 'border-border-hero bg-surface-hero text-text-mono',
      false: 'bg-background-white-pale hover:bg-surface-muted-faint',
    },
    disabled: {
      true: 'cursor-not-allowed bg-surface-muted-faint text-text-muted opacity-50',
      false: 'cursor-pointer',
    },
  },
});
