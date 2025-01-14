import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative pl-[1.1875rem]',
      bullet: 'absolute left-0 block border',
      link: 'text-text hover:cursor-pointer hover:underline',
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
          bullet: 'border-primary bg-primary after:border-primary',
        },
        hero: {
          bullet: 'border-hero bg-hero after:border-hero',
        },
        neutral: {
          bullet: 'border-neutral bg-neutral after:border-neutral',
        },
        success: {
          bullet: 'border-success bg-success after:border-success',
        },
        danger: {
          bullet: 'border-danger bg-danger after:border-danger',
        },
        link: {
          bullet: 'border-link bg-link after:border-link',
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
