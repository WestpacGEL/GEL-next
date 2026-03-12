import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'mb-0 content-start typography-body-9 font-medium text-text-body transition-colors',
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
