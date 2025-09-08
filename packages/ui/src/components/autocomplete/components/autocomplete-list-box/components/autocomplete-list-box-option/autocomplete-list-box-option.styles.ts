import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'group flex cursor-pointer items-center justify-between bg-background-white-pale p-2 px-3 text-sm text-text-body transition-colors',
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
