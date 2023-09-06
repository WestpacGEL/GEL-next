import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'flex flex-col items-end gap-1',
    variants: {
      align: {
        center: 'justify-center',
        top: 'justify-start',
        bottom: 'justify-end',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
