import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex flex-none flex-col items-end gap-1',
    },
    variants: {
      align: {
        center: { base: 'justify-center' },
        top: { base: 'justify-start' },
        bottom: { base: 'justify-end' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
