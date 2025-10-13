import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    default: 'border-border-muted-soft bg-background-white-pale flex flex-col gap-2 rounded-xl border p-6',
    table: 'border-border-muted-soft bg-background-white-pale mt-4 mb-5 max-w-5xl rounded-xl border p-6',
  },
});
