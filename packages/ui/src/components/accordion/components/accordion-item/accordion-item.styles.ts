import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      itemHeader: 'typography-body-9 flex w-full items-center justify-between px-3 py-2 focus:focus-outline',
      indicator: '',
      content: 'hidden',
    },
    variants: {
      look: {
        material: {
          itemHeader: 'bg-white transition-colors hover:bg-light',
          indicator:
            'relative h-2 w-2 before:absolute before:left-1/2 before:top-1/2 before:block before:h-[2px] before:w-full before:-translate-x-1/2 before:-translate-y-1/2 before:bg-muted after:absolute after:left-1/2 after:top-1/2 after:block after:h-full after:w-[2px] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-muted after:transition-transform',
        },
        default: {
          itemHeader: 'border-t border-border bg-light',
          indicator: 'h-3 w-3 -rotate-90 transition-transform',
        },
      },
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
