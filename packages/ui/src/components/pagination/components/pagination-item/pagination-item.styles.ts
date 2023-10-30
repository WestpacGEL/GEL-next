import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'typography-body-10 relative block border border-border px-2 py-[0.5625rem] text-center text-text transition-colors',
    variants: {
      firstItem: {
        true: 'rounded-l-[0.1875rem]',
        false: 'ml-[-1px]',
      },
      lastItem: {
        true: 'rounded-r-[0.1875rem]',
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
