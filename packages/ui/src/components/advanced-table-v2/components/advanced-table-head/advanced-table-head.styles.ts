import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    thead: '',
    headerRow: '',
    th: 'border-b-3 border-border-hero bg-background-white text-left typography-body-9 font-medium whitespace-nowrap',
    // `relative` anchors the resize handle's `absolute` position here, not on the `<th>`.
    headerContent: 'relative flex flex-row items-center gap-1',
    sortButton:
      'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm focus-visible:focus-outline',
    dragHandle: 'inline-flex min-h-4 cursor-move items-center rounded-sm focus-visible:focus-outline',
  },
  variants: {
    padding: {
      default: { th: 'px-2 pt-3 pb-2' },
      large: { th: 'px-3 pt-4 pb-3' },
    },
    bordered: {
      true: { th: 'border-r border-border-muted-soft last:border-r-0' },
    },
    // A sticky cell needs an opaque background so non-pinned columns scrolling underneath don't show through.
    isPinned: {
      true: { th: 'sticky bg-background-white' },
    },
    pinnedEdge: {
      left: { th: 'shadow-md' },
      right: { th: 'shadow-md' },
    },
    isDragging: {
      true: { th: 'relative opacity-80' },
    },
  },
  defaultVariants: {
    padding: 'default',
  },
});
