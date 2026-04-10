import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    underlay: 'fixed inset-0',
    popover: 'flex min-w-[200px] flex-col border border-border-muted-soft bg-background-white outline-none',
  },
});
