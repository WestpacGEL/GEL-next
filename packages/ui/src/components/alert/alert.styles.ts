import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'typography-body-10 relative mb-5 xsl:flex',
      icon: 'float-left flex-none',
      body: 'relative flex-1 xsl:top-[0.125rem] [&_:focus-visible]:focus-outline [&_a]:underline',
      heading: 'typography-body-9 mb-1 font-bold',
      close: 'absolute right-0.5 top-0.5 h-5.5 p-1 hover:opacity-80',
    },
    variants: {
      look: {
        info: {
          base: 'text-info',
        },
        success: {
          base: 'text-success',
        },
        warning: {
          base: 'text-warning',
        },
        danger: {
          base: 'text-danger',
        },
        system: {
          base: 'text-black',
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
        className: 'border-info-50 bg-info-5',
      },
      {
        slots: ['base'],
        look: 'success',
        mode: 'box',
        className: 'border-success-50 bg-success-5',
      },
      {
        slots: ['base'],
        look: 'warning',
        mode: 'box',
        className: 'border-warning-50 bg-warning-5',
      },
      {
        slots: ['base'],
        look: 'danger',
        mode: 'box',
        className: 'border-danger-50 bg-danger-5',
      },
      {
        slots: ['base'],
        look: 'system',
        mode: 'box',
        className: 'border-system bg-system',
      },
      {
        slots: ['base'],
        mode: 'box',
        dismissible: true,
        className: 'pr-6',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
