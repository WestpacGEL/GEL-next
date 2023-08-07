import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'flex flex-col',
    variants: {
      rounded: {
        true: 'overflow-hidden rounded',
      },
      look: {
        material: '',
        default: 'border border-border',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
