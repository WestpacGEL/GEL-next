import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    cellContent: 'flex flex-row items-center gap-1',
    cellText: '',
    td: 'border-b border-border-muted-soft typography-body-9 font-normal outline-offset-[-1px] focus:outline-border-focus',
  },
  variants: {
    align: {
      center: { cellContent: 'justify-center', td: 'text-center' },
      left: { cellContent: 'justify-start', td: 'text-left' },
      right: { cellContent: 'justify-end', td: 'text-right' },
    },
    bordered: {
      // Drop the last row's bottom border so it doesn't double against the table's outer border
      true: { td: 'border-r border-border-muted-soft group-last/row:border-b-0 last:border-r-0' },
    },
    isPinned: {
      true: { td: 'sticky bg-background-white' },
    },
    overflow: {
      none: {},
      truncate: { cellText: 'min-w-0 truncate' },
      wrap: { cellText: 'min-w-0 break-words' },
    },
    padding: {
      default: { td: 'p-2' },
      large: { td: 'p-3' },
    },
    pinnedEdge: {
      left: { td: 'shadow-md' },
      right: { td: 'shadow-md' },
    },
  },
  defaultVariants: {
    align: 'left',
    overflow: 'wrap',
    padding: 'default',
  },
});
