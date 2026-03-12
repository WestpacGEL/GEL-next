import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'bg-[transparent] hover:underline',
    iconBefore: 'relative bottom-[0.1em] mr-1',
    iconAfter: 'relative bottom-[0.1em] ml-1',
  },
  variants: {
    type: {
      inline: {
        base: 'inline text-text-link',
      },
      standalone: {
        base: 'text-text-body',
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
