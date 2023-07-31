import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'flex-1 p-4 focus:focus-outline',
    variants: {
      look: {
        default: 'border border-border',
        material: '',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
