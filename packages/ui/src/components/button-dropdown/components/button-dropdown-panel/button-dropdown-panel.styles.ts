import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'border-border-muted-soft bg-background-white-pale mt-0.5 rounded-xl border p-2 shadow-[0_0.375rem_0.75rem_rgba(0,0,0,0.175)]',
    dialog: '',
  },
  variants: {
    isFocused: {
      true: {
        dialog: 'outline-none',
      },
    },
  },
});
