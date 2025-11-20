import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    checkbox: 'flex size-4 items-center justify-center rounded border border-border-muted-strong',
    ul: 'max-h-72 w-full overflow-auto outline-none',
  },
});
