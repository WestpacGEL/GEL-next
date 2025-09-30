import { tv } from 'tailwind-variants';

// eslint-disable-next-line tailwindcss/no-custom-classname
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
          'border-border-muted-soft bg-surface-muted-faint !shadow-border mb-[-1px] border-r border-l-[0.375rem] shadow-[inset_0px_1px_0_0_var(--border-muted-soft),inset_0_-1px_0_0_var(--border-muted-soft)] transition-colors',
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
    { slots: ['content'], isOpen: true, look: 'lego', className: 'mt-[1px] border-t-0 border-r border-l-[0.375rem]' },
    {
      slots: ['itemHeader'],
      isOpen: true,
      rounded: true,
      className: 'group-last:rounded-none',
    },
  ],
});
