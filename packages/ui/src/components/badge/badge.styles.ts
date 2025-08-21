import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'inline-block w-fit whitespace-nowrap text-center',
    variants: {
      color: {
        danger: 'bg-surface-danger text-text-mono',
        faint: 'bg-surface-muted-soft text-text-body',
        hero: 'bg-surface-hero text-text-mono',
        info: 'bg-surface-info text-text-mono',
        muted: 'bg-surface-muted text-text-mono',
        primary: 'bg-surface-primary text-text-mono',
        success: 'bg-surface-success text-text-mono',
        warning: 'bg-surface-warning text-text-mono',
        'danger-inverted': 'border-none bg-surface-mono text-text-danger',
        'faint-inverted': 'border-none bg-surface-mono text-text-muted',
        'hero-inverted': 'border-none bg-surface-mono text-text-hero',
        'info-inverted': 'border-none bg-surface-mono text-text-info',
        'primary-inverted': 'border-none bg-surface-mono text-text-primary',
        'success-inverted': 'border-none bg-surface-mono text-text-success',
        'warning-inverted': 'border-none bg-surface-mono text-text-warning',
      },
      type: {
        pill: 'typography-body-10 flex h-4 w-fit items-center rounded-xl px-[0.4375rem] font-medium leading-none',
        default: 'h-[1.25rem] rounded-sm px-1 text-[0.75rem] leading-[1.25rem]',
      },
      soft: {
        true: 'border',
        false: '',
      },
    },
    compoundVariants: [
      {
        color: 'danger',
        soft: true,
        className: 'bg-surface-danger-faint text-text-danger',
      },
      {
        color: 'faint',
        soft: true,
        className: 'border-border-muted-soft bg-surface-muted-faint text-text-muted',
      },
      {
        color: 'hero',
        soft: true,
        className: 'bg-surface-hero-faint text-text-hero',
      },
      {
        color: 'info',
        soft: true,
        className: 'bg-surface-info-faint text-text-info',
      },
      {
        color: 'muted',
        soft: true,
        className: 'bg-surface-muted-pale text-text-muted',
      },
      {
        color: 'primary',
        soft: true,
        className: 'bg-surface-primary-faint text-text-primary',
      },
      {
        color: 'success',
        soft: true,
        className: 'bg-surface-success-faint text-text-success',
      },
      {
        color: 'warning',
        soft: true,
        className: 'bg-surface-warning-faint text-text-warning',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
