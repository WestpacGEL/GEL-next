import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    default: `
      flex flex-col gap-2 rounded-3xl border border-border-muted-soft
      bg-background-white-pale p-6
    `,
    table: `
      mt-4 mb-5 max-w-5xl rounded-3xl border border-border-muted-soft
      bg-background-white-pale p-6
    `,
  },
});
