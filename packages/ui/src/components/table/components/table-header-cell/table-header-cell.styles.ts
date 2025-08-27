import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'typography-body-10 border border-x-0 border-b-[3px] border-t-0 border-border-hero p-2 text-left align-bottom text-text-body group-[:nth-child(1)_&]/row:border-b group-[:nth-child(1)_&]/row:border-b-border-muted-soft',
    },
    variants: {
      bordered: {
        true: { base: 'border-x border-t border-x-border-muted-soft border-t-border-muted-soft' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
