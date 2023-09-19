import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'px-0 text-text no-underline hover:underline focus:focus-outline',
      content: 'typography-body-10 mb-2 block',
    },
    variants: {
      open: {
        true: { base: 'block' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
