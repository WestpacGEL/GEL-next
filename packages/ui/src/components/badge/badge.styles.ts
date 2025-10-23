import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'inline-block w-fit whitespace-nowrap border text-center',
    variants: {
      color: {
        danger: 'border-danger bg-danger text-white',
        faint: 'border-border bg-border text-text',
        hero: 'border-hero bg-hero text-white',
        info: 'border-info bg-info text-white',
        neutral: 'border-neutral bg-neutral text-white',
        muted: 'border-muted bg-muted text-white',
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
        pill: 'typography-body-10 flex h-4 min-w-4 w-fit items-center justify-center rounded-xl px-[0.4375rem] font-medium leading-none',
        default: 'h-[1.25rem] rounded-sm px-1 text-[0.75rem] leading-[1.125rem]',
      },
      soft: {
        true: 'bg-white',
      },
    },
    compoundVariants: [
      {
        color: 'danger',
        soft: true,
        className: 'text-danger',
      },
      {
        color: 'faint',
        soft: true,
        className: 'text-text',
      },
      {
        color: 'hero',
        soft: true,
        className: 'text-hero',
      },
      {
        color: 'info',
        soft: true,
        className: 'text-info',
      },
      {
        color: 'neutral',
        soft: true,
        className: 'text-neutral',
      },
      {
        color: 'muted',
        soft: true,
        className: 'text-muted',
      },
      {
        color: 'primary',
        soft: true,
        className: 'text-primary',
      },
      {
        color: 'success',
        soft: true,
        className: 'text-success',
      },
      {
        color: 'warning',
        soft: true,
        className: 'text-warning',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
