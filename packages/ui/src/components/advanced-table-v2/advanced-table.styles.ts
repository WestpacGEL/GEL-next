import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'overflow-x-auto',
    table: 'border-separate border-spacing-0 overflow-hidden rounded-md',
    thead: '',
    headerRow: '',
    th: 'border-b-3 border-border-hero bg-background-white text-left typography-body-9 font-medium whitespace-nowrap',
    // Flex wrapper laying out the header label alongside the sort control (and,
    // in later tickets, the column menu / resize handle).
    headerContent: 'flex flex-row items-center gap-1',
    // Sort toggle. A real <button> so it is keyboard operable; visible focus ring.
    sortButton: 'inline-flex shrink-0 cursor-pointer items-center rounded-sm focus-visible:focus-outline',
    tbody: '',
    // TODO(tickets 05/11/14): focus outline carried over from the old component.
    // Nothing makes a row focusable yet — re-check it's still required once row
    // selection / editing / the a11y hardening pass land.
    row: 'group/row outline-offset-[-1px] focus:outline-border-focus',
    // TODO(tickets 05/11/14): as above — re-check the cell focus outline is still
    // required once cells become focusable (selection, editing, a11y hardening).
    td: 'border-b border-border-muted-soft typography-body-9 outline-offset-[-1px] focus:outline-border-focus',
    // TODO(tickets 09/11): cell-content flex wrapper carried over from the old
    // component (consistent vertical centering + icon/text gap). Re-check it's
    // still required once expansion/editing wrap the first column's content.
    cellContent: 'flex flex-row items-center gap-1',
    emptyCell: 'border-b border-border-muted-soft',
    srOnly: 'sr-only',
  },
  variants: {
    fillContainer: {
      true: { table: 'w-full' },
      false: { table: 'w-auto' },
    },
    bordered: {
      true: { table: 'border border-border-muted-soft' },
    },
    // TODO: check UI against developed when header cells available for rows
    padding: {
      default: { th: 'px-2 pt-3 pb-2', td: 'p-2' },
      large: { th: 'px-3 pt-4 pb-3', td: 'p-3' },
    },
    background: {
      transparent: { row: 'hover:bg-surface-hover-muted-pale' },
      striped: { row: 'odd:bg-background-white even:bg-surface-muted-faint' },
      filled: { row: 'bg-background-white' },
    },
  },
  compoundVariants: [
    {
      bordered: true,
      className: {
        th: 'border-r border-border-muted-soft last:border-r-0',
        // Drop the last row's bottom border so it doesn't double against the
        // table's outer border (mirrors the old component).
        td: 'border-r border-border-muted-soft group-last/row:border-b-0 last:border-r-0',
      },
    },
  ],
  defaultVariants: {
    fillContainer: true,
    padding: 'default',
    background: 'transparent',
  },
});
