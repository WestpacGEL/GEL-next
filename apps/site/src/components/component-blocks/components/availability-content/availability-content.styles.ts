import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    contentContainer: `
      mt-4 mb-5 max-w-5xl rounded-3xl bg-background-white
    `,
    tableContainer: `
      relative rounded-3xl border border-border-muted-soft
    `,
  },
  variants: {
    size: {
      xl: { tableContainer: 'p-8' },
      lg: { tableContainer: 'p-7' },
      md: { tableContainer: 'p-6' },
      sm: { tableContainer: 'p-5' },
      xsl: { tableContainer: 'p-4' },
      initial: { tableContainer: 'p-3' },
    },
  },
});
