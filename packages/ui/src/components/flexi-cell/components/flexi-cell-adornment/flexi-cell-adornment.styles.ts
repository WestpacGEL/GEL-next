import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex flex-none flex-col items-end gap-1',
      leftGraphic: 'max-sm:h-5 max-sm:w-5 sm:h-6 sm:w-6',
      promoGraphic: 'h-10.5 w-full object-cover',
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
