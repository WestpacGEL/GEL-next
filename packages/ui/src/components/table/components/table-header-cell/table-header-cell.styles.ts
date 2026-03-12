import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'border border-x-0 border-t-0 border-b-[3px] border-border-hero p-2 text-left align-bottom typography-body-10 text-text-body group-[:nth-child(1)_&]/row:border-b group-[:nth-child(1)_&]/row:border-b-border-muted-soft',
  },
  variants: {
    bordered: {
      true: { base: 'border-x border-t border-x-border-muted-soft border-t-border-muted-soft' },
    },
  },
});
