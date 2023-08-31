import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'text-text typography-body-10 border-hero border border-x-0 border-b-[3px] border-t-0 p-2 text-left align-bottom',
    },
    variants: {
      bordered: {
        true: { base: 'border-x-1 border-t-1 border-x-border border-t-border' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
