import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    // TODO(tickets 11/14): focus outline carried over from the old component.
    // Nothing makes a cell focusable yet — re-check it's still required once
    // editing / the a11y hardening pass land.
    td: 'border-b border-border-muted-soft typography-body-9 outline-offset-[-1px] focus:outline-border-focus',
    // TODO(tickets 09/11): cell-content flex wrapper carried over from the old
    // component (consistent vertical centering + icon/text gap). Re-check it's
    // still required once expansion/editing wrap the first column's content.
    cellContent: 'flex flex-row items-center gap-1',
  },
  variants: {
    padding: {
      default: { td: 'p-2' },
      large: { td: 'p-3' },
    },
    bordered: {
      // Drop the last row's bottom border so it doesn't double against the table's outer border
      true: { td: 'border-r border-border-muted-soft group-last/row:border-b-0 last:border-r-0' },
    },
    // A sticky cell needs an opaque background so non-pinned columns scrolling
    // underneath don't show through. This flattens row striping/fill to solid
    // white for a pinned column while scrolled — a documented, pre-existing
    // simplification carried over from the old component.
    isPinned: {
      true: { td: 'sticky bg-background-white' },
    },
    // Shadow indicating the scroll boundary at a pinned column's outer edge.
    pinnedEdge: {
      left: { td: 'shadow-md' },
      right: { td: 'shadow-md' },
    },
  },
  defaultVariants: {
    padding: 'default',
  },
});
