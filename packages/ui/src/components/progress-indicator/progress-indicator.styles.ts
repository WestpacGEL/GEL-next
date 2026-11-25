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
    // The spinner is an Icon: let its colour mapping own token fallbacks.
    // These variants style only the label, so they cannot override the spinner.
    color: {
      body: {
        label: 'text-text-body',
      },
      heading: {
        label: 'text-text-heading',
      },
      link: {
        label: 'text-text-link',
      },
      muted: {
        label: 'text-surface-muted',
      },
      'muted-vivid': {
        label: 'text-surface-muted-vivid',
      },
      'muted-strong': {
        label: 'text-surface-muted-strong',
      },
      'muted-mild': {
        label: 'text-surface-muted-mild',
      },
      'muted-soft': {
        label: 'text-surface-muted-soft',
      },
      'muted-pale': {
        label: 'text-surface-muted-pale',
      },
      'muted-faint': {
        label: 'text-surface-muted-faint',
      },
      'white-pale': {
        label: 'text-background-white',
      },
      'white-faint': {
        label: 'text-background-white',
      },
      mono: {
        label: 'text-surface-mono',
      },
      primary: {
        label: 'text-surface-primary',
      },
      'primary-faint': {
        label: 'text-surface-primary-faint',
      },
      hero: {
        label: 'text-surface-hero',
      },
      'hero-faint': {
        label: 'text-surface-hero-faint',
      },
      pop: {
        label: 'text-surface-pop',
      },
      'pop-faint': {
        label: 'text-surface-pop-faint',
      },
      holler: {
        label: 'text-surface-holler',
      },
      'holler-faint': {
        label: 'text-surface-holler-faint',
      },
      success: {
        label: 'text-surface-success',
      },
      'success-faint': {
        label: 'text-surface-success-faint',
      },
      info: {
        label: 'text-surface-info',
      },
      'info-faint': {
        label: 'text-surface-info-faint',
      },
      warning: {
        label: 'text-surface-warning',
      },
      'warning-faint': {
        label: 'text-surface-warning-faint',
      },
      danger: {
        label: 'text-surface-danger',
      },
      'danger-faint': {
        label: 'text-surface-danger-faint',
      },
      'system-error': {
        label: 'text-surface-system-error',
      },
      'system-error-dark': {
        label: 'text-surface-system-error-dark',
      },
      reversed: {
        label: 'text-surface-reversed',
      },
    },
  },
});
