import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'mb-0 content-start font-medium text-text transition-colors max-sm:typography-body-9 sm:typography-body-8',
    variants: {
      truncateText: {
        true: 'truncate whitespace-nowrap',
      },
      rightLabel: {
        true: 'font-normal',
        false: 'group-hover/dualaction:text-primary group-hover/noborder:text-primary',
      },
      subLabel: { true: 'font-normal text-muted sm:typography-body-10 max-sm:text-[12px]' },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
