import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'typography-body-9 text-text-body mb-0 content-start font-medium transition-colors',
  variants: {
    truncateText: {
      true: 'truncate whitespace-nowrap',
    },
    rightLabel: {
      true: 'font-normal',
      false: 'group-hover/dualaction:text-text-primary group-hover/noborder:text-text-primary',
    },
  },
});
