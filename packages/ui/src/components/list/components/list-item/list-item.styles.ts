import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative pl-[1.1875rem]',
    bullet: 'absolute left-0 block border',
    link: 'text-text-body hover:cursor-pointer hover:underline',
  },
  variants: {
    icon: {
      true: {},
    },
    spacing: {
      medium: {
        base: 'my-1',
      },
      large: {
        base: 'my-2',
      },
    },
    look: {
      primary: {
        bullet: 'border-border-primary bg-surface-primary after:border-border-primary',
      },
      hero: {
        bullet: 'border-border-hero bg-surface-hero after:border-border-hero',
      },
      success: {
        bullet: 'border-border-success bg-surface-success after:border-border-success',
      },
      danger: {
        bullet: 'border-border-danger bg-surface-danger after:border-border-danger',
      },
      link: {
        bullet: 'border-border-primary bg-surface-primary after:border-border-primary',
      },
    },
    type: {
      bullet: {
        bullet: 'top-1 left-[0.25rem] size-[0.5rem] rounded-full',
      },
      link: {
        bullet:
          'top-1 left-[0.125rem] size-[0.5rem] rotate-45 border-t-[0.125rem] border-r-[0.125rem] border-b-0 border-l-0 bg-[transparent]',
      },
      tick: {
        bullet:
          'top-[0.3125rem] left-[0.125rem] h-1 w-2 rotate-[-44deg] border-t-0 border-r-0 border-b-[0.125rem] border-l-[0.125rem] bg-[transparent]',
      },
      cross: {
        bullet:
          'top-[0.25rem] left-1 h-2 w-0 -rotate-45 border-y-0 border-r-0 border-l-[0.125rem] bg-[transparent] after:absolute after:left-[-0.125rem] after:block after:h-2 after:w-0 after:rotate-90 after:border-y-0 after:border-r-0 after:border-l-[0.125rem]',
      },
      unstyled: {
        base: 'pl-0',
        bullet: 'pl-[1.1875rem]',
      },
      icon: {
        base: 'pl-[1.4375rem]',
        bullet: 'border-none bg-[transparent]',
      },
      ordered: {
        base: 'pl-0',
      },
    },
    nested: {
      true: { bullet: 'bg-[transparent]' },
    },
    isFocusVisible: {
      true: { link: 'focus-outline' },
    },
  },
  compoundSlots: [
    {
      slots: ['bullet'],
      type: 'link',
      icon: true,
      className: 'top-0 left-0 size-3 rotate-0 border-none bg-[transparent]',
    },
    {
      slots: ['base'],
      type: 'link',
      icon: true,
      className: 'pl-[1.4375rem]',
    },
  ],
});
