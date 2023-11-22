import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'typography-body-9 mb-0 content-start font-medium text-text transition-colors',
    variants: {
      truncateText: {
        true: 'truncate whitespace-nowrap',
      },
      rightLabel: {
        true: 'font-normal',
        false: 'group-hover/dualaction:text-primary group-hover/noborder:text-primary',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
