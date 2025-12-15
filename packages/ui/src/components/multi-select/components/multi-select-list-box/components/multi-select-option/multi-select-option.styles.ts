import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'flex cursor-pointer flex-col justify-between bg-white p-2 text-sm text-text transition-[background-color] hover:bg-background',
    checkbox: 'size-4',
    body: '-mt-0.5 flex flex-1 items-center',
    flexZero: 'flex-none',
    itemContainer: 'flex gap-1',
    description: 'typography-body-10 relative ml-5 text-muted',
  },
  variants: {
    selectionMode: {
      none: {},
      multiple: {
        checkbox: 'flex items-center justify-center rounded border border-hero',
      },
      single: {
        checkbox: '',
      },
    },
    isFocusVisible: {
      true: {
        root: 'bg-background !outline-offset-[-2px] focus-outline',
      },
    },
    disabled: {
      true: {
        root: 'cursor-not-allowed text-muted',
      },
    },
  },
});
