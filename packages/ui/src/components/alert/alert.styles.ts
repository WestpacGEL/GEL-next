import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'typography-body-10 xsl:flex relative mb-5',
    icon: 'float-left flex-none',
    body: 'xsl:top-[0.125rem] relative flex-1 overflow-hidden [&_a]:underline',
    heading: 'typography-body-9 mb-1 font-bold',
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
        icon: 'xsl:mr-2 mr-1',
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
      className: 'bg-surface-system-error border-y-0',
    },
    {
      slots: ['base'],
      mode: 'box',
      dismissible: true,
      className: 'pr-6',
    },
  ],
});
