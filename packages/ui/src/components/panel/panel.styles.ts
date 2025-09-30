import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'group/panel border-border-hero bg-background-white-pale text-text-body overflow-hidden rounded-2xl border',
    header: 'px-2 py-[0.625rem] sm:px-4',
  },
  variants: {
    look: {
      hero: {
        header: 'bg-surface-hero text-text-mono',
      },
      faint: {
        base: 'border-border-muted-soft',
        header: 'border-b-border-muted-soft bg-surface-muted-faint text-text-body border-0 border-b',
      },
    },
  },
});
