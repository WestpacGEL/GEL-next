import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: '',
    text: 'size-6 rounded-full border border-white text-center leading-[2.125rem] hover:bg-primary/5',
  },
  variants: {
    isDisabled: {
      true: {
        text: 'opacity-50',
      },
    },
    isUnavailable: {
      true: {
        text: 'focus-outline',
      },
    },
    isFocused: {
      true: {
        text: 'focus-outline',
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
