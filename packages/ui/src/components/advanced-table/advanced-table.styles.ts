import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: '',
    table: 'border-separate border-spacing-0 overflow-hidden rounded-md border border-border',
    tableHeader: '',
    headerRow: '',
    th: 'border-b border-border bg-background',
    headerContent: 'relative flex flex-row gap-1 p-2',
    resizeBar: 'absolute right-0 h-3 w-[2px] cursor-col-resize select-none rounded bg-border',
    tableBody: '',
    bodyRow: '',
    td: 'border-b border-border p-2',
  },
  variants: {
    virtualized: {
      true: {
        container: '',
        table: '',
        tableHeader: 'table table-fixed',
        headerRow: '',
        th: '',
        tableBody: 'relative block table-fixed overflow-auto',
        bodyRow: 'absolute',
        td: '',
      },
      false: {
        container: '',
      },
    },
  },
});
