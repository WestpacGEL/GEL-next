import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'flex-1 bg-surface-white-pale p-4',
    variants: {
      look: {
        default: 'border border-border-muted-soft',
        material: '',
      },
      isFocused: {
        true: 'outline-none',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
