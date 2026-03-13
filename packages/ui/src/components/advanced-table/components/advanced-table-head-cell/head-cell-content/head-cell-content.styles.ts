import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    headerContent: 'relative flex flex-row gap-1 p-2',
    resizeBar: 'absolute right-0 h-3 w-[2px] cursor-col-resize rounded bg-surface-muted-soft select-none',
  },
  variants: {
    cellPadding: {
      small: {
        headerContent: 'px-2 pt-3 pb-2',
      },
      medium: {
        headerContent: 'px-3 pt-4 pb-3',
      },
    },
    bordered: {
      true: {
        headerContent: 'border-r border-border-muted-soft group-last/head:border-r-0',
      },
    },
  },
});
