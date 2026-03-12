import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'border-0 border-t border-border-muted-soft bg-surface-muted-faint px-2 py-[0.625rem] sm:px-4 [&_:focus-visible]:focus-outline',
  },
});
