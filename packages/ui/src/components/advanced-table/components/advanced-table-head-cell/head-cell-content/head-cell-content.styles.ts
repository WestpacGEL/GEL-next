import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    headerContent: 'relative flex flex-row gap-1 p-2',
    resizeBar: 'absolute right-0 h-3 w-[2px] cursor-col-resize select-none rounded bg-border',
  },
});
