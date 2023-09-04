import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'text-text focus:focus-outline px-0 no-underline hover:underline',
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
