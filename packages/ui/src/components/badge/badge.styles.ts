import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'inline-block w-fit text-center whitespace-nowrap',
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
      'danger-inverted': 'bg-surface-mono text-text-danger border-none',
      'faint-inverted': 'bg-surface-mono text-text-muted border-none',
      'hero-inverted': 'bg-surface-mono text-text-hero border-none',
      'info-inverted': 'bg-surface-mono text-text-info border-none',
      'primary-inverted': 'bg-surface-mono text-text-primary border-none',
      'success-inverted': 'bg-surface-mono text-text-success border-none',
      'warning-inverted': 'bg-surface-mono text-text-warning border-none',
    },
    type: {
      pill: 'typography-body-10 flex h-4 w-fit min-w-4 items-center justify-center rounded-full px-[0.4375rem] leading-none font-medium',
      default: 'h-[1.25rem] rounded-sm px-1 text-[0.75rem]',
    },
    soft: {
      true: 'border leading-[1.125rem]',
      false: 'leading-[1.25rem]',
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
});
