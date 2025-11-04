import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative mb-5 typography-body-10 xsl:flex',
    icon: 'float-left flex-none',
    body: 'relative flex-1 overflow-hidden xsl:top-[0.125rem] [&_a]:underline',
    heading: 'mb-1 typography-body-9 font-bold',
    close: 'absolute top-0.5 right-0.5 h-5.5 p-1',
  },
  variants: {
    look: {
      info: {
        base: 'text-text-info',
      },
      success: {
        base: 'text-text-success',
      },
      warning: {
        base: 'text-text-warning',
      },
      danger: {
        base: 'text-text-danger',
      },
      system: {
        base: 'text-text-system-error',
      },
    },
    mode: {
      box: {
        base: 'border-y p-3',
      },
      text: {
        base: 'bg-[transparent]',
      },
    },
    dismissible: {
      true: '',
    },
    hasSize: {
      true: {},
      false: {
        icon: 'mr-1 xsl:mr-2',
      },
    },
    iconSize: {
      xsmall: {
        icon: 'mr-1',
      },
      small: {
        icon: 'mr-1',
      },
      medium: {
        icon: 'mr-2',
      },
      large: {
        icon: 'mr-2',
      },
      xlarge: {
        icon: 'mr-2',
      },
    },
  },
  compoundSlots: [
    {
      slots: ['base'],
      look: 'info',
      mode: 'box',
      className: 'border-border-info-mild bg-surface-info-faint',
    },
    {
      slots: ['base'],
      look: 'success',
      mode: 'box',
      className: 'border-border-success-mild bg-surface-success-faint',
    },
    {
      slots: ['base'],
      look: 'warning',
      mode: 'box',
      className: 'border-border-warning-mild bg-surface-warning-faint',
    },
    {
      slots: ['base'],
      look: 'danger',
      mode: 'box',
      className: 'border-border-danger-mild bg-surface-danger-faint',
    },
    {
      slots: ['base'],
      look: 'system',
      mode: 'box',
      className: 'border-y-0 bg-surface-system-error',
    },
    {
      slots: ['base'],
      mode: 'box',
      dismissible: true,
      className: 'pr-6',
    },
  ],
});
