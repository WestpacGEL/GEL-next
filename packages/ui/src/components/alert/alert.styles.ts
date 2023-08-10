import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'typography-body-10 relative mb-4 p-3 xsl:flex',
      icon: 'float-left mr-1 flex-none xsl:mr-2',
      body: 'relative flex-1 xsl:top-[0.125rem] [&_a]:underline',
      heading: 'typography-body-9 mb-2 font-bold',
      close: 'absolute right-[0.1875rem] top-[0.1875rem] p-1 hover:opacity-[0.8]',
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
          base: 'border-y',
        },
        text: {
          base: 'bg-[transparent]',
        },
      },
      dismissible: {
        true: '',
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
