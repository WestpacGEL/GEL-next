import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    default: 'flex flex-col gap-2 bg-white p-6',
    table: 'mb-5 mt-4 max-w-5xl bg-white p-6',
  },
});
