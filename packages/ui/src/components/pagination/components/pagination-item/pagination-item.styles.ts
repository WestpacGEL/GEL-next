import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'typography-body-10 relative block min-w-7 border border-border-muted-soft px-2 py-1.5 text-center text-text-body',
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
        true: 'z-10 border-border-hero bg-surface-hero text-text-mono',
        false: 'hover:bg-surface-muted-faint bg-surface-white-pale',
      },
      disabled: {
        true: 'cursor-not-allowed bg-surface-muted-faint text-text-muted opacity-50',
        false: 'cursor-pointer',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
