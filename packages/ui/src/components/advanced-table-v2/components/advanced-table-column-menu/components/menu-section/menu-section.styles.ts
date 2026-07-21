import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    section: '',
    heading: 'm-1 flex h-6 items-center bg-surface-muted-faint px-1 align-middle typography-body-10 text-text-hero',
    filterItem: 'border-b-1 border-border-muted-soft p-2',
  },
});
