import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'box-border inline-block animate-[spin_0.7s_linear_infinite] rounded-full border border-y-[1px] border-l-[1px] border-r-0 border-t-[transparent]',
    variants: {
      size: {
        xsmall: 'h-2 w-2',
        small: 'h-3 w-3',
        medium: 'h-4 w-4',
        large: 'h-6 w-6',
        xlarge: 'h-8 w-8',
      },
      inverted: {
        true: 'border-b-white border-l-white',
        false: 'border-b-hero border-l-hero',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
