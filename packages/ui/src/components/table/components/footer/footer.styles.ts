import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'text-muted typography-body-10 p-2 text-left font-light' },
    variants: {
      bordered: {
        true: { base: 'border-border border' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
