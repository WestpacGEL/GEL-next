import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      itemHeader: 'typography-body-9 flex w-full items-center justify-between px-3 py-2',
      indicator: 'h-3 w-3 rotate-90 transition-transform',
      content: 'hidden',
    },
    variants: {
      look: {
        soft: {
          itemHeader: 'border-t border-border bg-light',
        },
        lego: {
          itemHeader: 'border-l-[0.375rem] border-t border-border bg-light transition-colors',
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
        isOpen: true,
        className: '-rotate-90',
      },
      {
        slots: ['itemHeader'],
        look: 'lego',
        isOpen: true,
        className: 'border-l-hero',
      },
      {
        slots: ['content'],
        look: 'lego',
        className: 'border-l-[0.375rem] border-l-border',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
