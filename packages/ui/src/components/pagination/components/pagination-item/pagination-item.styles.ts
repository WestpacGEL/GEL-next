import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'typography-body-10 border-border-muted-soft text-text-body relative block min-w-7 border px-2 py-1.5 text-center',
  variants: {
    isFocusVisible: {
      true: 'focus-outline',
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
      true: 'border-border-hero bg-surface-hero text-text-mono z-10',
      false: 'bg-background-white-pale hover:bg-surface-muted-faint',
    },
    disabled: {
      true: 'bg-surface-muted-faint text-text-muted cursor-not-allowed opacity-50',
      false: 'cursor-pointer',
    },
  },
});
