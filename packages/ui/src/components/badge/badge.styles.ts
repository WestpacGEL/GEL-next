import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'inline-block whitespace-nowrap border text-center leading-none',
    variants: {
      color: {
        danger: 'border-danger bg-danger text-white',
        faint: 'border-border bg-white text-muted',
        hero: 'border-hero bg-hero text-white',
        info: 'border-info bg-info text-white',
        neutral: 'border-neutral bg-neutral text-white',
        primary: 'border-primary bg-primary text-white',
        success: 'border-success bg-success text-white',
        warning: 'border-warning bg-warning text-white',
        'danger-inverted': 'border-none bg-white text-danger',
        'faint-inverted': 'border-none bg-white text-muted',
        'hero-inverted': 'border-none bg-white text-hero',
        'info-inverted': 'border-none bg-white text-info',
        'neutral-inverted': 'border-none bg-white text-neutral',
        'primary-inverted': 'border-none bg-white text-primary',
        'success-inverted': 'border-none bg-white text-success',
        'warning-inverted': 'border-none bg-white text-warning',
      },
      type: {
        pill: 'typography-body-10 rounded-xl px-[0.4375rem] py-[0.25rem] font-bold leading-none',
        default: 'rounded-sm px-1 py-0.5 pb-[0.125rem] text-[0.75rem] leading-none',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
