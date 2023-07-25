import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'inline-block whitespace-nowrap text-center leading-none',
    variants: {
      color: {
        danger: 'bg-danger text-white',
        faint: 'border border-border bg-white text-muted',
        hero: 'bg-hero text-white',
        info: 'bg-info text-white',
        neutral: 'bg-neutral text-white',
        primary: 'bg-primary text-white',
        success: 'bg-success text-white',
        warning: 'bg-warning text-white',
        'danger-inverted': 'bg-white text-danger',
        'faint-inverted': 'bg-white text-muted',
        'hero-inverted': 'bg-white text-hero',
        'info-inverted': 'bg-white text-info',
        'neutral-inverted': 'bg-white text-neutral',
        'primary-inverted': 'bg-white text-primary',
        'success-inverted': 'bg-white text-success',
        'warning-inverted': 'bg-white text-warning',
      },
      type: {
        pill: 'typography-body-10 rounded-xl px-[0.4375rem] py-[0.25rem] font-bold leading-none',
        default: 'rounded-sm px-1 py-[0.1875rem] pb-[0.125rem] text-[0.75rem] leading-none',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
