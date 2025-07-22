import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'group/panel overflow-hidden rounded border border-border-hero text-text-body',
      header: 'px-2 py-[0.625rem] sm:px-4',
    },
    variants: {
      look: {
        hero: {
          header: 'bg-surface-hero text-text-mono',
        },
        faint: {
          base: 'border-border-muted-soft',
          header: 'border-0 border-b border-b-border bg-surface-muted text-text-body',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
