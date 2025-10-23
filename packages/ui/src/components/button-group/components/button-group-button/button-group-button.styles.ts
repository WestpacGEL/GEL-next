import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    button: '',
  },
  variants: {
    isDisabled: {
      true: {
        button: 'pointer-events-none touch-none opacity-50',
      },
    },
    isFocusVisible: {
      true: {
        button: 'focus-outline relative',
      },
    },
    block: {
      true: {},
      false: {},
    },
    size: {
      small: {
        button: 'rounded-l-sm rounded-r-sm',
      },
      medium: {
        button: 'rounded-l-md rounded-r-md',
      },
      large: {
        button: 'rounded-l-lg rounded-r-lg',
      },
      xlarge: {
        button: 'rounded-l-xl rounded-r-xl',
      },
    },
    orientation: {
      horizontal: {
        button: 'not-last:border-r-none not-first:rounded-l-none not-first:border-l-0 not-last:rounded-r-none',
      },
      vertical: {
        button: 'not-last:border-b-none not-first:rounded-t-none not-first:border-t-0 not-last:rounded-b-none',
      },
    },
  },
});
