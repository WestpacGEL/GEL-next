import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'flex items-center justify-center',
    text: 'size-6 rounded-full border border-white text-center leading-[2.125rem]',
  },
  variants: {
    isDisabled: {
      true: {
        text: 'cursor-default line-through opacity-50',
      },
      false: {
        text: 'hover:bg-primary/5',
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
        text: 'border-primary bg-primary/5',
      },
    },
    isSelected: {
      true: {
        text: 'bg-primary text-white hover:bg-primary',
      },
      false: 'bg-white',
    },
  },
});
