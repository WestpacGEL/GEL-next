import { tv } from 'tailwind-variants';

export const styles = tv(
  {
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
        neutral: {
          bullet: 'border-neutral[REPLACE_TOKEN] bg-neutral[REPLACE_TOKEN] after:border-neutral[REPLACE_TOKEN]',
        },
        success: {
          bullet: 'border-border-success bg-surface-success after:border-border-success',
        },
        danger: {
          bullet: 'border-border-danger bg-surface-danger after:border-border-danger',
        },
        link: {
          bullet: 'border-link[REPLACE_TOKEN] after:border-link[REPLACE_TOKEN] bg-surface-primary',
        },
      },
      type: {
        bullet: {
          bullet: 'left-[0.25rem] top-1 size-[0.5rem] rounded-full',
        },
        link: {
          bullet:
            'left-[0.125rem] top-1 size-[0.5rem] rotate-45 border-b-0 border-l-0 border-r-[0.125rem] border-t-[0.125rem] bg-[transparent]',
        },
        tick: {
          bullet:
            ' left-[0.125rem] top-[0.3125rem] h-1 w-2 rotate-[-44deg] border-b-[0.125rem] border-l-[0.125rem] border-r-0 border-t-0 bg-[transparent]',
        },
        cross: {
          bullet:
            'left-1 top-[0.25rem] h-2 w-0 -rotate-45 border-y-0 border-l-[0.125rem] border-r-0 bg-[transparent] after:absolute after:left-[-0.125rem] after:block after:h-2 after:w-0 after:rotate-90 after:border-y-0 after:border-l-[0.125rem] after:border-r-0',
        },
        unstyled: {
          base: 'pl-0',
          bullet: 'pl-[1.1875rem] ',
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
        className: 'left-0 top-0 size-3 rotate-0 border-none bg-[transparent]',
      },
      {
        slots: ['base'],
        type: 'link',
        icon: true,
        className: 'pl-[1.4375rem]',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
