import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'typography-body-10 border-border-hero text-text-body group-[:nth-child(1)_&]/row:border-b-border-muted-soft border border-x-0 border-t-0 border-b-[3px] p-2 text-left align-bottom group-[:nth-child(1)_&]/row:border-b',
  },
  variants: {
    bordered: {
      true: { base: 'border-x-border-muted-soft border-t-border-muted-soft border-x border-t' },
    },
  },
});
