import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: '',
    item: 'border-border-muted-soft bg-background-white-pale mb-2 overflow-hidden rounded-2xl border',
    header: 'text-text-body px-3 py-2.5',
    headerTitle: 'flex min-w-0 flex-1 items-center',
    primaryHeading: 'flex w-full',
    secondaryHeading: 'text-text-muted flex min-w-0 flex-1 items-center pl-4',
    itemIndex: 'typography-body-9 mr-1 w-3 flex-none font-bold',
    removeBtn: 'mt-[0.875rem] h-auto p-0 no-underline hover:underline',
    addBtn: 'h-auto p-0 no-underline hover:underline',
    toggleBtn: 'p-0',
    collapsible: '',
    content: 'px-3 pt-0 pb-5 md:px-9',
    footer: '',
    titlePrimary: 'typography-body-9 font-bold',
    titleSecondary: 'mt-1 items-center',
    titleTertiary: 'mt-1 items-center',
  },
  variants: {
    isFocusVisible: {
      true: {
        toggleBtn: 'focus-outline',
      },
    },
  },
  compoundSlots: [
    {
      slots: ['titlePrimary', 'titleSecondary', 'titleTertiary'],
      class: ['mr-1', 'truncate', 'flex-1'],
    },
  ],
});
