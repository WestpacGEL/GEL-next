import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    th: 'border-b border-border bg-background',
    headerContent: 'relative flex flex-row gap-1 p-2',
    resizeBar: 'absolute right-0 h-3 w-[2px] cursor-col-resize select-none rounded bg-border',
  },
  variants: {
    scrollableRows: {
      true: {
        th: '',
      },
    },
    scrollableColumns: {
      true: {
        th: '',
      },
    },
  },
});
