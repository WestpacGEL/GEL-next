import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'typography-body-10 text-text-muted m-0 font-normal',
  variants: {
    truncateText: {
      true: 'truncate whitespace-nowrap',
    },
  },
});
