import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    underlay: 'fixed inset-0 bg-black/5',
    overlay: 'z-10 rounded-md border border-border-muted-soft bg-background-white-faint shadow-lg',
  },
});
