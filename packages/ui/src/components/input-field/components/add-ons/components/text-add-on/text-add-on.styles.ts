import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'relative box-border whitespace-nowrap border border-borderDark bg-light',
    variants: {
      position: {
        before: 'rounded-l-[0.1875rem]',
        after: 'rounded-r-[0.1875rem]',
      },
      size: {
        small: 'typography-body-10 h-5 px-[0.5625rem] pb-[0.25rem] pt-[0.1875rem]',
        medium: 'typography-body-9 h-6 px-2 py-[0.3125rem]',
        large: 'typography-body-9 h-7 px-[0.9375rem] py-[0.5rem]',
        xlarge: 'typography-body-8 h-8 px-3 py-[0.5625rem] pb-[0.625rem]',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
