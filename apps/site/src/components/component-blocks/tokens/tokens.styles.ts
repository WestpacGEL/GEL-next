import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'mt-4 !gap-0 rounded-3xl border border-border-muted-soft bg-background-white',
  },
  variants: {
    size: {
      xl: { container: 'p-8' },
      lg: { container: 'p-7' },
      md: { container: 'p-6' },
      sm: { container: 'p-5' },
      xsl: { container: 'p-4' },
      initial: { container: 'p-3' },
    },
  },
});
