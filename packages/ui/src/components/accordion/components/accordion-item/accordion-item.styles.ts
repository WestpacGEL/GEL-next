import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      itemHeader: 'typography-body-9 flex w-full items-center justify-between px-3 py-2',
      indicator: '',
      content: 'hidden',
    },
    variants: {
      look: {
        material: {
          itemHeader: 'hover:bg-light bg-white transition-colors',
          indicator:
            'before:bg-muted after:bg-muted relative h-2 w-2 before:absolute before:left-1/2 before:top-1/2 before:block before:h-[2px] before:w-full before:-translate-x-1/2 before:-translate-y-1/2 after:absolute after:left-1/2 after:top-1/2 after:block after:h-full after:w-[2px] after:-translate-x-1/2 after:-translate-y-1/2 after:transition-transform',
        },
        default: {
          itemHeader: 'border-border bg-light border-t',
          indicator: 'h-3 w-3 -rotate-90 transition-transform',
        },
      },
      color: {
        hero: {
          itemHeader: 'border-l-border border-l-[0.375rem] transition-colors',
        },
        primary: {
          itemHeader: 'border-l-border border-l-[0.375rem] transition-colors',
        },
      },
      isOpen: {
        true: {
          content: 'border-border block border-t p-3',
        },
        false: {
          base: '',
        },
      },
      isDisabled: {
        true: '',
        false: '',
      },
      isFocusVisible: {
        true: {
          itemHeader: 'focus-outline',
        },
        false: {
          itemHeader: 'outline-none',
        },
      },
    },
    compoundSlots: [
      {
        slots: ['indicator'],
        look: 'default',
        isOpen: true,
        className: 'rotate-90',
      },
      {
        slots: ['indicator'],
        look: 'material',
        isOpen: true,
        className: 'after:rotate-90',
      },
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
        className: 'border-l-border border-l-[0.375rem]',
      },
      {
        slots: ['content'],
        color: 'primary',
        className: 'border-l-border border-l-[0.375rem]',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
