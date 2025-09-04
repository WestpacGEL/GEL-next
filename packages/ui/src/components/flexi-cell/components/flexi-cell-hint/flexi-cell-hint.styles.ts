import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'typography-body-10 m-0 font-normal text-text-muted',
  variants: {
    truncateText: {
      true: 'truncate whitespace-nowrap',
    },
  },
});
