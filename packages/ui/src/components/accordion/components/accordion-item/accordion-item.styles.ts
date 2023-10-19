import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative',
      itemHeader: 'typography-body-9 flex w-full items-center justify-between px-3 py-2',
      indicator: 'h-3 w-3 rotate-90',
      content: 'hidden',
    },
    variants: {
      look: {
        soft: {
          itemHeader: 'border-border bg-light border-t',
        },
        lego: {
          itemHeader: 'border-border bg-light border-l-border border-l-[0.375rem] border-t transition-colors',
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
        className: 'border-l-border border-l-[0.375rem]',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
