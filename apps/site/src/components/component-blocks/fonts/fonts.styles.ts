import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    default: 'flex flex-col gap-2 bg-surface-white-pale p-6',
    table: 'mb-5 mt-4 max-w-5xl bg-surface-white-pale p-6',
  },
});
