import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    th: 'group/head border-b-3 border-border-hero bg-background-white',
    // resizeBar: 'absolute right-0 h-3 w-[2px] cursor-col-resize rounded bg-surface-muted select-none',
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
