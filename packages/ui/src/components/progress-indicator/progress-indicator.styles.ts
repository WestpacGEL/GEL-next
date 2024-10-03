import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'box-border inline-block animate-[spin_0.7s_linear_infinite] rounded-full border border-r-0',
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
