import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'inline-flex bg-[transparent] hover:underline',
    iconBefore: 'mr-1',
    iconAfter: 'ml-1',
  },
  variants: {
    type: {
      inline: {
        base: 'items-baseline text-text-link',
        iconBefore: 'self-center',
        iconAfter: 'self-center',
      },
      standalone: {
        base: 'items-center text-text-body',
      },
    },
    underline: {
      true: '',
    },
    isFocusVisible: {
      true: { base: 'focus-outline' },
      false: { base: 'outline-none' },
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
});
