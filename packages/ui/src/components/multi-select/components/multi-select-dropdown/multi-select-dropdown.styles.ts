import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    popover: 'shadow',
    searchInputWrapper: 'border-b border-b-border-muted-soft p-2',
    clearButton: 'mt-0.5 px-2',
  },
});
