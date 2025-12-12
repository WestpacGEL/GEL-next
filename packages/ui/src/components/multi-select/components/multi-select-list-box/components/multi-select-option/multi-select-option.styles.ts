import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'flex cursor-pointer flex-col justify-between bg-background-white p-2 text-sm text-text-body transition-[background-color] hover:bg-surface-muted-faint',
    checkbox: 'size-4',
    body: '-mt-0.5 flex flex-1 items-center',
    flexZero: 'flex-0',
    itemContainer: 'flex gap-1',
    description: 'relative ml-5 typography-body-10 text-text-muted',
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
    isFocusVisible: {
      true: {
        root: 'bg-surface-muted-faint focus-outline -outline-offset-2',
      },
    },
    disabled: {
      true: {
        root: 'cursor-not-allowed text-text-muted',
      },
    },
  },
});
