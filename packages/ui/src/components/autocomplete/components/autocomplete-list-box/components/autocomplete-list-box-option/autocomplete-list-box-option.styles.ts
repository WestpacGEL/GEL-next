import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'group bg-background-white-pale text-text-body flex cursor-pointer items-center justify-between p-2 px-3 text-sm transition-colors',
  variants: {
    isFocused: {
      true: 'is-focused bg-surface-hero text-text-mono',
    },
    isSelected: {
      true: 'font-bold',
    },
    isDisabled: {
      true: 'text-text-muted',
    },
  },
});
