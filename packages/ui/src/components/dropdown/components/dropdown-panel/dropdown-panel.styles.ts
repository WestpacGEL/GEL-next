import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'mt-0.5 rounded-xl border border-border-muted-soft bg-background-white-pale p-2 shadow-[0_0.375rem_0.75rem_rgba(0,0,0,0.175)]',
    dialog: '[&_:focus-visible]:focus-outline',
  },
  variants: {
    isFocused: {
      true: {
        dialog: 'outline-none',
      },
    },
  },
});
