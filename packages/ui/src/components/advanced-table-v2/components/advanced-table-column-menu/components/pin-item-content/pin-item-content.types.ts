export type PinItemContentProps = {
  /** Whether the column is currently pinned in `direction`. */
  isPinned: boolean;
  /** Which edge this menu item pins/unpins the column to. */
  direction: 'left' | 'right';
};
