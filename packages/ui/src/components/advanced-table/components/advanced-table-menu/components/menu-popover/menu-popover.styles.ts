import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    underlay: 'fixed inset-0',
    popover:
      'flex min-w-[200px] flex-col rounded-xl border border-border-muted-soft bg-background-white shadow-[0_0.375rem_0.75rem_rgba(0,0,0,0.175)] outline-none',
  },
});
