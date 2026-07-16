import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    // 24x24px hit target (WCAG 2.5.8), matching the expand button/group-row precedent.
    button: 'flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm focus-visible:focus-outline',
  },
});
