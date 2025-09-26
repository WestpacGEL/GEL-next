import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'group',
    itemHeader: 'typography-body-9 flex w-full flex-1 items-center justify-between px-3 py-2 group-first:border-t-0',
    headerTitleWrapper: 'flex-1 pr-2 text-left',
    indicator: 'size-3 rotate-90',
    content: 'hidden',
  },
  variants: {
    look: {
      soft: {
        itemHeader: 'border-border-muted-soft bg-surface-muted-faint border-t',
      },
      lego: {
        itemHeader:
          'border-border-muted-soft border-t-border-muted-soft bg-surface-muted-faint !shadow-border-muted-soft border-l-[0.375rem] shadow-[inset_0_1px_0_var(--tw-shadow-color)] transition-colors',
      },
    },
    isFirst: {
      true: {
        itemHeader: 'border-t-0 shadow-none',
      },
    },
    isOpen: {
      true: {
        content: 'border-border-muted-soft block border-t p-3',
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
    rounded: {
      true: {
        itemHeader: 'group-first:rounded-t-2xl group-last:rounded-b-2xl',
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
      className: '!shadow-border-muted-soft shadow-[inset_0.375rem_0_0_var(--tw-shadow-color)]',
    },
    {
      slots: ['itemHeader'],
      isOpen: true,
      rounded: true,
      className: 'group-last:rounded-none',
    },
  ],
});
