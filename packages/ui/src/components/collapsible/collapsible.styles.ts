import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'px-0 text-text no-underline hover:underline',
      content: 'typography-body-10 mb-2 block [&_:focus-visible]:focus-outline',
    },
    variants: {
      open: {
        true: { base: 'block' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
