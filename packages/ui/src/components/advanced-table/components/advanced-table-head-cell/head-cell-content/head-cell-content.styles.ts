import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    headerContent: 'relative flex flex-row gap-1 p-2 select-none',
    resizeBar: '',
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
        resizeBar: 'absolute right-0 h-4 w-[1px] cursor-col-resize rounded bg-surface-muted-strong select-none',
      },
    },
    resizeable: {
      true: '',
      false: '',
    },
  },
  compoundSlots: [{ slots: ['headerContent'], bordered: true, resizeable: true, className: 'border-r-0' }],
});
