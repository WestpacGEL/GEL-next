import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'inline-flex items-center gap-1',
    toggleSlot: 'flex size-4 shrink-0 items-center justify-center',
    button: 'flex size-full cursor-pointer items-center justify-center rounded-sm focus-visible:focus-outline',
  },
});
