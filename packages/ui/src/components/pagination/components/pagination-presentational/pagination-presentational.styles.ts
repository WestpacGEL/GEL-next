import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex flex-col items-center',
      ul: 'flex',
      emptyItem:
        'typography-body-10 relative block min-w-7 cursor-default border-y border-border px-2 py-1.5 text-center text-text',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
