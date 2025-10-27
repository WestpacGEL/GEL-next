import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex gap-1 bg-white',
      primaryBtn: '',
      secondaryBtn: 'no-underline hover:underline',
    },
    variants: {
      size: {
        full: { base: 'px-4 py-3' },
        lg: { base: 'px-12 pb-12 pt-6' },
        md: { base: 'px-7 pb-7 pt-2' },
        sm: { base: 'flex-col px-5 pb-5 pt-2' },
        fluid: { base: 'px-5 pb-5 pt-2 max-md:flex-col' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
