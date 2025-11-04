import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    icon: 'absolute inset-0 m-auto',
    base: 'animate-[spin_0.7s_linear_infinite]',
    container: 'flex flex-col items-center',
    label: 'mt-1.5 typography-body-9',
  },
  variants: {
    size: {
      xsmall: { base: 'size-2' },
      small: { base: 'size-3' },
      medium: { base: 'size-4' },
      large: { base: 'size-15' },
      xlarge: { base: 'size-15' },
    },
    color: {
      muted: {
        base: 'text-surface-muted',
        label: 'text-surface-muted',
      },
      'muted-vivid': {
        base: 'text-surface-muted-vivid',
        label: 'text-surface-muted-vivid',
      },
      'muted-strong': {
        base: 'text-surface-muted-strong',
        label: 'text-surface-muted-strong',
      },
      'muted-mild': {
        base: 'text-surface-muted-mild',
        label: 'text-surface-muted-mild',
      },
      'muted-soft': {
        base: 'text-surface-muted-soft',
        label: 'text-surface-muted-soft',
      },
      'muted-pale': {
        base: 'text-surface-muted-pale',
        label: 'text-surface-muted-pale',
      },
      'muted-faint': {
        base: 'text-surface-muted-faint',
        label: 'text-surface-muted-faint',
      },
      'white-pale': {
        base: 'text-background-white-pale',
        label: 'text-background-white-pale',
      },
      'white-faint': {
        base: 'text-background-white-faint',
        label: 'text-background-white-faint',
      },
      mono: {
        base: 'text-surface-mono',
        label: 'text-surface-mono',
      },
      primary: {
        base: 'text-surface-primary',
        label: 'text-surface-primary',
      },
      'primary-faint': {
        base: 'text-surface-primary-faint',
        label: 'text-surface-primary-faint',
      },
      hero: {
        base: 'text-surface-hero',
        label: 'text-surface-hero',
      },
      'hero-faint': {
        base: 'text-surface-hero-faint',
        label: 'text-surface-hero-faint',
      },
      pop: {
        base: 'text-surface-pop',
        label: 'text-surface-pop',
      },
      'pop-faint': {
        base: 'text-surface-pop-faint',
        label: 'text-surface-pop-faint',
      },
      holler: {
        base: 'text-surface-holler',
        label: 'text-surface-holler',
      },
      'holler-faint': {
        base: 'text-surface-holler-faint',
        label: 'text-surface-holler-faint',
      },
      sing: {
        base: 'text-surface-sing',
        label: 'text-surface-sing',
      },
      'sing-faint': {
        base: 'text-surface-sing-faint',
        label: 'text-surface-sing-faint',
      },
      dance: {
        base: 'text-surface-dance',
        label: 'text-surface-dance',
      },
      'dance-faint': {
        base: 'text-surface-dance-faint',
        label: 'text-surface-dance-faint',
      },
      success: {
        base: 'text-surface-success',
        label: 'text-surface-success',
      },
      'success-faint': {
        base: 'text-surface-success-faint',
        label: 'text-surface-success-faint',
      },
      info: {
        base: 'text-surface-info',
        label: 'text-surface-info',
      },
      'info-faint': {
        base: 'text-surface-info-faint',
        label: 'text-surface-info-faint',
      },
      warning: {
        base: 'text-surface-warning',
        label: 'text-surface-warning',
      },
      'warning-faint': {
        base: 'text-surface-warning-faint',
        label: 'text-surface-warning-faint',
      },
      danger: {
        base: 'text-surface-danger',
        label: 'text-surface-danger',
      },
      'danger-faint': {
        base: 'text-surface-danger-faint',
        label: 'text-surface-danger-faint',
      },
      'system-error': {
        base: 'text-surface-system-error',
        label: 'text-surface-system-error',
      },
      'system-error-dark': {
        base: 'text-surface-system-error-dark',
        label: 'text-surface-system-error-dark',
      },
      reversed: {
        base: 'text-surface-reversed',
        label: 'text-surface-reversed',
      },
    },
  },
});
