import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'typography-body-8 mb-2 text-left font-light text-text-body group-first/panel:px-4 group-first/panel:pt-4 max-xsl:group-first/panel:px-2 max-xsl:group-first/panel:pt-2',
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
