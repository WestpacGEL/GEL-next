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
    td: 'border-b border-border bg-white p-2',
  },
  variants: {
    scrollableRows: {
      true: {
        container: 'relative h-[500px]',
        table: 'grid h-[500px] overflow-auto',
        tableHeader: 'sticky top-0 z-[1] grid',
        headerRow: '',
        th: '',
        tableBody: 'relative grid',
        bodyRow: 'absolute flex w-full',
        td: 'flex',
      },
    },
    scrollableColumns: {
      true: {
        container: 'flex w-[700px]',
        table: 'block w-[700px] overflow-auto',
        tableHeader: 'table table-fixed',
        headerRow: 'flex',
        th: '',
        tableBody: 'relative table-fixed',
        bodyRow: 'flex',
        td: '',
      },
    },
  },
});
