import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'm-0 typography-body-10 font-normal text-text-muted',
  variants: {
    truncateText: {
      true: 'truncate whitespace-nowrap',
    },
  },
});
