import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      itemHeader:
        'typography-body-9 flex w-full justify-between border-t border-border bg-light px-3 py-2 focus:focus-outline',
      indicator: 'h-3 w-3 -rotate-90 transition-transform',
      content: 'hidden',
    },
    variants: {
      color: {
        hero: {
          itemHeader: 'border-l-5 border-l-border transition-colors',
        },
        primary: {
          itemHeader: 'border-l-5 border-l-border transition-colors',
        },
      },
      isOpen: {
        true: {
          indicator: 'rotate-90',
          content: 'block border-t border-border p-3',
        },
        false: {
          base: '',
        },
      },
      isDisabled: {
        true: '',
        false: '',
      },
    },
    compoundSlots: [
      {
        slots: ['itemHeader'],
        color: 'primary',
        isOpen: true,
        className: 'border-l-primary',
      },
      {
        slots: ['itemHeader'],
        color: 'hero',
        isOpen: true,
        className: 'border-l-hero',
      },
      {
        slots: ['content'],
        color: 'hero',
        className: 'border-l-5 border-l-border',
      },
      {
        slots: ['content'],
        color: 'primary',
        className: 'border-l-5 border-l-border',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
