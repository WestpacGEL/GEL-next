import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    dragHandle: 'inline-flex min-h-4 cursor-move items-center rounded-sm focus-visible:focus-outline',
    // `relative` anchors the resize handle's `absolute` position here, not on the `<th>`.
    headerContent: 'relative flex flex-row items-center gap-1',
    headerRow: '',
    sortButton:
      'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm focus-visible:focus-outline',
    th: 'border-b-3 border-border-hero bg-background-white typography-body-9 font-medium whitespace-nowrap',
  },
  variants: {
    align: {
      left: { headerContent: 'justify-start', th: 'text-left' },
      center: { headerContent: 'justify-center', th: 'text-center' },
      right: { headerContent: 'justify-end', th: 'text-right' },
    },
    bordered: {
      true: { th: 'border-r border-border-muted-soft last:border-r-0' },
    },
    isDragging: {
      true: { th: 'relative opacity-80' },
    },
    // A sticky cell needs an opaque background so non-pinned columns scrolling underneath don't show through.
    isPinned: {
      true: { th: 'sticky bg-background-white' },
    },
    padding: {
      default: { th: 'px-2 pt-3 pb-2' },
      large: { th: 'px-3 pt-4 pb-3' },
    },
    pinnedEdge: {
      left: { th: 'shadow-md' },
      right: { th: 'shadow-md' },
    },
  },
  defaultVariants: {
    align: 'left',
    padding: 'default',
  },
});
