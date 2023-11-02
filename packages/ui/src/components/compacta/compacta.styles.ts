import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      item: 'mb-2 overflow-hidden rounded-[0.1875rem] border border-borderDark',
      header: 'bg-white px-3 py-[0.9375rem] text-text',
      headerTitle: 'flex min-w-0 flex-1 items-center',
      primaryHeading: 'flex w-full',
      secondaryHeading: 'flex min-w-0 flex-1 items-center pl-4 text-muted',
      itemIndex: 'typography-body-9 mr-1 w-3 flex-none font-bold',
      removeBtn: 'mt-[0.875rem] h-auto p-0 no-underline hover:underline',
      addBtn: 'h-auto p-0 no-underline hover:underline',
      toggleBtn: 'p-0',
      collapsible: '',
      content: 'p-[0_1.125rem_1.875rem] xsl:pl-[3.375rem]',
      footer: '',
      titlePrimary: 'typography-body-9 font-bold',
      titleSecondary: 'mt-1 items-center',
      titleTertiary: 'mt-1 items-center',
    },
    variants: {},
    compoundSlots: [
      {
        slots: ['titlePrimary', 'titleSecondary', 'titleTertiary'],
        class: ['mr-1', 'truncate', 'flex-1'],
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
