import { tv } from 'tailwind-variants';

export const styles = tv(
  {
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
          itemHeader: 'border-t border-border bg-light',
        },
        lego: {
          itemHeader:
            'mb-[-1px] border-l-[0.375rem] border-r border-border bg-light shadow-[inset_0px_1px_0_0_var(--tw-shadow-color),inset_0_-1px_0_0_var(--tw-shadow-color)] !shadow-border transition-colors',
        },
      },
      isOpen: {
        true: {
          content: 'block border-border p-3',
        },
        false: {
          base: '',
          itemHeader: 'background-transition hover:bg-background',
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
      rounded: { true: { itemHeader: 'group-first:rounded-t-sm group-last:rounded-b-sm' } },
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
        look: 'soft',
        isOpen: true,
        className: 'border-t',
      },
      {
        slots: ['itemHeader'],
        isOpen: true,
        rounded: true,
        className: 'group-last:rounded-none',
      },
      { slots: ['content'], isOpen: true, look: 'lego', className: 'mt-[1px] border-l-[0.375rem] border-r' },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
