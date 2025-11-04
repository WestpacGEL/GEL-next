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
        button: 'relative z-10 focus-outline',
      },
    },
    block: {
      true: {
        button: 'flex-1',
      },
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
        button: 'not-first:rounded-l-none not-first:border-l-0 not-last:rounded-r-none not-last:border-r-0',
      },
      vertical: {
        button: 'not-first:rounded-t-none not-first:border-t-0 not-last:rounded-b-none not-last:border-b-0',
      },
    },
  },
});
