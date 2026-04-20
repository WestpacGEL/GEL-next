import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    headerContent: 'relative flex flex-row items-center gap-1 p-2 select-none',
    resizeBar: '',
    sortButton: 'flex cursor-pointer flex-col',
    resizeHandle: 'cursor-col-resize',
    resizeHitArea: 'absolute top-0 -right-1 h-full w-2',
  },
  variants: {
    extraCellPadding: {
      false: {
        headerContent: 'px-2 pt-3 pb-2',
      },
      true: {
        headerContent: 'px-3 pt-4 pb-3',
      },
    },
    bordered: {
      true: {
        headerContent: 'border-r border-border-muted-soft group-last/head:border-0',
        resizeBar:
          'absolute top-0 right-0 h-full w-[1px] bg-border-muted-soft select-none group-last/head:bg-[transparent]',
      },
      false: {
        resizeBar:
          'absolute right-0 bottom-2 h-4 w-[3px] cursor-col-resize rounded bg-surface-muted-strong select-none',
      },
    },
    resizable: {
      true: '',
      false: '',
    },
  },
  compoundSlots: [
    { slots: ['headerContent'], bordered: true, resizable: true, className: 'border-r-0' },
    { slots: ['resizeBar'], extraCellPadding: true, resizable: true, className: 'bottom-3' },
  ],
});
