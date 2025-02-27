import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'pointer-events-none size-4 text-[12px] font-bold text-muted' },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
