import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'group flex cursor-pointer flex-col justify-between bg-background-white-pale p-2 text-sm text-text-body transition-colors hover:bg-surface-muted-faint',
    checkbox: 'size-4',
    body: '-mt-0.5 flex flex-1 items-center',
    flexZero: 'flex-0',
  },
  variants: {
    selectionMode: {
      none: {},
      multiple: {
        checkbox: 'flex items-center justify-center rounded border border-border-muted-strong',
      },
      single: {
        checkbox: '',
      },
    },
    focused: {
      true: {
        root: 'bg-surface-muted-faint',
      },
    },
    isFocusVisible: {
      true: {
        root: 'focus-outline -outline-offset-2',
      },
    },
    selected: {
      true: {
        root: '',
      },
    },
    disabled: {
      true: {
        root: 'cursor-not-allowed text-text-muted',
      },
    },
  },
  compoundVariants: [
    {
      // Selected + focused -> same pink color
      selected: true,
      focused: true,
      className: {
        root: '',
      },
    },
  ],
});
