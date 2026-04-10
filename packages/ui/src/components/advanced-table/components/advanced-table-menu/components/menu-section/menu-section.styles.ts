import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    heading: 'm-1 flex h-6 items-center bg-surface-muted-faint px-1 align-middle typography-body-10 text-text-hero',
    group: 'flex flex-col gap-1',
    filterItem: 'p-2',
  },
});
