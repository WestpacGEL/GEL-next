import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'flex items-center justify-center',
    text: 'size-[2.375rem] rounded-full border border-[transparent] text-center leading-[2.25rem] text-text-body',
  },
  variants: {
    isDisabled: {
      true: {
        text: 'cursor-default text-text-muted line-through',
      },
      false: {
        text: 'hover:bg-surface-primary-faint',
      },
    },
    isUnavailable: {
      true: {
        text: 'cursor-default text-text-muted line-through',
      },
      false: {},
    },
    isFocused: {
      true: {
        text: 'focus-outline !outline-offset-0',
      },
    },
    isToday: {
      true: {
        text: 'border-border-primary bg-surface-primary-faint',
      },
    },
    isSelected: {
      true: {
        text: 'border-border-mono bg-surface-primary text-text-mono hover:bg-surface-primary',
      },
      false: '',
    },
  },
});
