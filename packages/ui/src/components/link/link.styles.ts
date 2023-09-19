import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'inline-flex bg-[transparent] hover:underline focus:focus-outline',
      text: 'typography-body-10',
      iconBefore: 'mr-1',
      iconAfter: 'ml-1',
    },
    variants: {
      type: {
        inline: {
          base: 'items-baseline text-link',
          iconBefore: 'self-center',
          iconAfter: 'self-center',
        },
        standalone: {
          base: 'items-center text-text',
        },
      },
      underline: {
        true: '',
      },
    },
    compoundSlots: [
      {
        slots: ['base'],
        type: 'inline',
        underline: true,
        className: 'underline hover:no-underline',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
