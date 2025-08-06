import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative',
      itemHeader: 'typography-body-9 flex w-full flex-1 items-center justify-between px-3 py-2',
      headerTitleWrapper: 'flex-1 pr-2 text-left',
      indicator: 'size-3 rotate-90',
      content: 'hidden',
    },
    variants: {
      look: {
        soft: {
          itemHeader: 'border-t border-border-muted-soft bg-surface-muted-faint',
        },
        lego: {
          itemHeader:
            'border-l-[0.375rem] border-border-muted-soft border-t-border-muted-soft bg-surface-muted-faint shadow-[inset_0_1px_0_var(--tw-shadow-color)] !shadow-border-muted-soft transition-colors',
        },
      },
      isOpen: {
        true: {
          content: 'block border-t border-border-muted-soft p-3',
        },
        false: {
          base: '',
          itemHeader: 'background-transition hover:bg-surface-hover-muted-pale',
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
        className: 'border-l-border-hero',
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
