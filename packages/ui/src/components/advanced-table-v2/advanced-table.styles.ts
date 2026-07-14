import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'overflow-x-auto',
    table: 'w-full border-separate border-spacing-0 overflow-hidden rounded-md',
    caption: 'p-3 text-left typography-body-8',
    thead: '',
    headerRow: '',
    th: 'border-b-3 border-border-hero bg-background-white p-3 text-left typography-body-9 font-medium whitespace-nowrap',
    tbody: '',
    row: 'group/row hover:bg-surface-hover-muted-pale',
    td: 'border-b border-border-muted-soft p-3 typography-body-9',
  },
});
