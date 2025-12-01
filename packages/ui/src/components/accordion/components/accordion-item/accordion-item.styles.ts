import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'group',
    itemHeader: `
      flex w-full flex-1 items-center justify-between px-3 py-2
      typography-body-9
      group-first:border-t-0
    `,
    headerTitleWrapper: 'flex-1 pr-2 text-left',
    indicator: 'size-3 rotate-90',
    panel: `
      h-(--disclosure-panel-height) transition-[height] duration-300
      ease-[cubic-bezier(0.25,0.1,0.25,1)]
    `,
    content: 'block border-border-muted-soft bg-background-white-pale p-3 [&_:focus-visible]:focus-outline',
  },
  variants: {
    look: {
      soft: {
        itemHeader: 'border-t border-border-muted-soft bg-surface-muted-faint',
        content: 'border-t',
      },
      lego: {
        itemHeader: `
          mb-[-1px] border-r border-l-[0.375rem] border-border-muted-soft
          bg-surface-muted-faint
          shadow-[inset_0px_1px_0_0_var(--border-muted-soft),inset_0_-1px_0_0_var(--border-muted-soft)]
          !shadow-border-muted-soft transition-colors
        `,
        content: 'mt-[1px] border-t-0 border-r border-l-[0.375rem]',
      },
    },
    isFirst: {
      true: {
        itemHeader: 'border-t-0 shadow-none',
      },
    },
    isExpanded: {
      false: {
        itemHeader: `
          background-transition
          hover:bg-surface-hover-muted-pale
        `,
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
        itemHeader: `
          group-first:rounded-t-2xl
          group-last:rounded-b-2xl
        `,
      },
    },
  },
  compoundSlots: [
    {
      slots: ['indicator'],
      isExpanded: true,
      className: '-rotate-90',
    },
    {
      slots: ['itemHeader'],
      look: 'lego',
      isExpanded: true,
      className: 'border-l-border-hero',
    },
    {
      slots: ['itemHeader'],
      isExpanded: true,
      rounded: true,
      className: 'group-last:rounded-none',
    },
    {
      slots: ['content'],
      isExpanded: true,
      rounded: true,
      className: 'group-last:rounded-b-2xl',
    },
  ],
});
