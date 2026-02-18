import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'absolute left-1 z-10 rounded-sm border border-border-muted-soft bg-surface-muted-faint p-0.5 whitespace-nowrap text-text-body',
  variants: {
    position: {
      top: 'top-auto bottom-full',
      bottom: 'top-full mt-2 mb-0',
    },
  },
});
