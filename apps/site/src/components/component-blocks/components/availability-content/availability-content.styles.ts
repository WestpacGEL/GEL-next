import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    contentContainer: `
      mt-4 mb-5 max-w-5xl rounded-3xl bg-background-white-faint p-6 pb-0
    `,
    tableContainer: `
      relative -mx-6 -mt-6 rounded-3xl border border-border-muted-soft px-6 pt-9
      pb-6
    `,
  },
});
