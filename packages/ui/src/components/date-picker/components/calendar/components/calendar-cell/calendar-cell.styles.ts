import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'flex items-center justify-center',
    text: 'size-6 rounded-full border border-[transparent] text-center leading-[2.125rem] text-text-body',
  },
  variants: {
    isDisabled: {
      true: {
        text: 'cursor-default line-through opacity-50',
      },
      false: {
        text: 'hover:bg-surface-primary/5',
      },
    },
    isUnavailable: {
      true: {
        text: 'cursor-default line-through opacity-50',
      },
      false: {},
    },
    isFocused: {
      true: {
        text: '!outline-offset-0 focus-outline',
      },
    },
    isToday: {
      true: {
        text: 'border-border-primary bg-surface-primary/5',
      },
    },
    isSelected: {
      true: {
        text: 'border-border-mono bg-surface-primary text-text-mono hover:bg-surface-primary',
      },
      false: 'bg-white[REPLACE_TOKEN]',
    },
  },
});
