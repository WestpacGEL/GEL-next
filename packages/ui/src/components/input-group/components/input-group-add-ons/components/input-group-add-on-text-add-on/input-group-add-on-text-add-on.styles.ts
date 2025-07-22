import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'relative box-border whitespace-nowrap border border-border-muted-strong bg-surface-muted-faint',
    variants: {
      position: {
        before: 'rounded-l',
        after: 'rounded-r',
      },
      size: {
        small: 'typography-body-10 h-5 px-1.5 pb-[0.25rem] pt-0.5',
        medium: 'typography-body-9 h-6 px-2 py-[0.3125rem]',
        large: 'typography-body-9 h-7 px-2.5 py-[0.5rem]',
        xlarge: 'typography-body-8 h-8 px-3 py-1.5 pb-[0.625rem]',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
