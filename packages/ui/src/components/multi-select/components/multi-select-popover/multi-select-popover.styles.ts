import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    underlay: 'fixed inset-0 bg-black/5',
    overlay: 'z-10 flex flex-col rounded-md border border-border bg-white shadow-lg',
  },
});
