import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'typography-body-10 pl-[1.1875rem]',
      bullet: 'absolute block border',
      link: 'text-text focus:focus-outline hover:cursor-pointer hover:underline',
      wrapper: 'relative',
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
          bullet: 'left-[0.25rem] top-[0.375rem] h-[0.5rem] w-[0.5rem] rounded-full',
        },
        link: {
          bullet:
            'left-[0.125rem] top-[0.375rem] h-[0.5rem] w-[0.5rem] rotate-45 border-b-0 border-l-0 border-r-[0.125rem] border-t-[0.125rem] bg-[transparent]',
        },
        tick: {
          bullet:
            ' left-[0.125rem] top-[0.3125rem] h-[0.375rem] w-[0.75rem] rotate-[-44deg] border-b-[0.125rem] border-l-[0.125rem] border-r-0 border-t-0 bg-[transparent]',
        },
        cross: {
          bullet:
            'left-[0.375rem] top-[0.25rem] h-[0.75rem] w-0 -rotate-45 border-y-0 border-l-[0.125rem] border-r-0 bg-[transparent] after:absolute after:left-[-0.125rem] after:block after:h-[0.75rem] after:w-0 after:rotate-90 after:border-y-0 after:border-l-[0.125rem] after:border-r-0',
        },
        unstyled: {
          base: 'pl-0',
          bullet: 'pl-[1.1875rem] ',
        },
        icon: {
          base: '',
          bullet: 'border-none bg-[transparent]',
        },
        ordered: {
          base: 'pl-0',
        },
      },
      nested: {
        true: { bullet: 'bg-[transparent]' },
      },
    },
    compoundSlots: [
      {
        slots: ['bullet'],
        type: 'link',
        icon: true,
        className: 'left-0 top-0 h-3 w-3 rotate-0 border-none bg-[transparent]',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
