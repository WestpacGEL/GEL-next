import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: '',
    button:
      'active-theme-rams:border-b-primary active-theme-rams:before:hidden pointer-events-none rounded-none group-[:not(:first-child)]/buttons:border-l-0 hover:cursor-pointer',
  },
  variants: {
    isDisabled: {
      true: {
        button: 'pointer-events-none opacity-50',
      },
    },
    isFocusVisible: {
      true: {
        button: 'focus-outline relative',
      },
    },
    block: {
      true: {
        base: 'w-full',
      },
      false: { base: 'w-auto' },
    },
    hasTransition: {
      true: {
        button: 'pointer-events-auto',
      },
      false: {
        button: 'pointer-events-none',
      },
    },
    size: {
      small: {
        button: 'group-first/buttons:rounded-l-sm group-last/buttons:rounded-r-sm',
      },
      medium: {
        button: 'group-first/buttons:rounded-l-md group-last/buttons:rounded-r-md',
      },
      large: {
        button: 'group-first/buttons:rounded-l-lg group-last/buttons:rounded-r-lg',
      },
      xlarge: {
        button: 'group-first/buttons:rounded-l-xl group-last/buttons:rounded-r-xl',
      },
    },
  },
});
