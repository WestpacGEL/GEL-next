import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'typography-body-10 relative block border border-border px-2 py-1.5 text-center text-text transition-colors',
    variants: {
      firstItem: {
        true: 'rounded-l',
        false: 'ml-[-1px]',
      },
      lastItem: {
        true: 'rounded-r',
        false: '',
      },
      active: {
        true: 'z-10 border-hero bg-hero text-white',
        false: 'hover:bg-light',
      },
      disabled: {
        true: 'cursor-not-allowed bg-light text-muted opacity-50',
        false: 'cursor-pointer',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
