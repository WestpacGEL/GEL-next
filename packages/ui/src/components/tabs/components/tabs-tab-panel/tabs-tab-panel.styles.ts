import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'flex-1 bg-white p-4 [&_:focus-visible]:focus-outline',
    variants: {
      look: {
        default: 'border border-border',
        material: '',
      },
      isFocused: {
        true: 'outline-none',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
