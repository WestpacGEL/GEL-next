import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    thead: '',
    headerRow: '',
    th: 'border-b-3 border-border-hero bg-background-white text-left typography-body-9 font-medium whitespace-nowrap',
    // Flex wrapper laying out the header label alongside the sort control (and,
    // in later tickets, the column menu / resize handle).
    headerContent: 'flex flex-row items-center gap-1',
    // Sort toggle. A real <button> so it is keyboard operable; visible focus ring.
    sortButton: 'inline-flex shrink-0 cursor-pointer items-center rounded-sm focus-visible:focus-outline',
  },
  variants: {
    // TODO: check UI against developed when header cells available for rows
    padding: {
      default: { th: 'px-2 pt-3 pb-2' },
      large: { th: 'px-3 pt-4 pb-3' },
    },
    bordered: {
      true: { th: 'border-r border-border-muted-soft last:border-r-0' },
    },
    // A sticky cell needs an opaque background so non-pinned columns scrolling
    // underneath don't show through.
    isPinned: {
      true: { th: 'sticky bg-background-white' },
    },
    // Shadow indicating the scroll boundary at a pinned column's outer edge.
    pinnedEdge: {
      left: { th: 'shadow-[inset_-4px_0_4px_-4px_var(--tw-shadow-color)] shadow-black/10' },
      right: { th: 'shadow-[inset_4px_0_4px_-4px_var(--tw-shadow-color)] shadow-black/10' },
    },
  },
  defaultVariants: {
    padding: 'default',
  },
});
