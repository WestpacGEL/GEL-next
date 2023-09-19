import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'border-hero group/panel mb-4 overflow-hidden rounded-[0.1875rem] border',
      header: 'max-xsl:px-2 px-4 py-[0.625rem]',
    },
    variants: {
      look: {
        hero: {
          header: 'bg-hero text-white',
        },
        faint: {
          base: 'border-border',
          header: 'text-text bg-background border-b-border border-0 border-b',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
