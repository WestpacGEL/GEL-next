import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'pointer-events-none text-[12px] font-bold text-muted' },
    variants: {
      promoCircle: {
        true: { base: 'h-[70px] w-[70px] border border-border bg-white' },
        false: { base: 'xsl:h-5 xsl:w-5 sm:h-6 sm:w-6' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
