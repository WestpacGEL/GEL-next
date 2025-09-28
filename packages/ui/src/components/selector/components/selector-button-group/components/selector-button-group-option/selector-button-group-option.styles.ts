import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'group/radio-option text-text-body text-left max-sm:mb-0 max-sm:gap-2 max-sm:p-2 sm:mb-0 sm:gap-3 sm:p-3',
    icon: 'text-surface-primary mr-[-6px] transition-transform',
  },
  variants: {
    isFocusVisible: {
      true: {
        base: 'focus-outline',
      },
      false: {},
    },
    isSelected: {
      true: {
        base: 'border-border-hero',
      },
      false: {},
    },
    isDisabled: {
      true: {
        base: 'pointer-events-none opacity-50',
      },
      false: {
        base: 'hover:border-border-hero cursor-pointer',
        icon: 'max-sm:group-hover/radio-option:translate-x-0.5 sm:group-hover/radio-option:translate-x-1',
      },
    },
  },
});
