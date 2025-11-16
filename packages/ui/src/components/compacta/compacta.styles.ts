import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      item: 'mb-2 overflow-hidden rounded border border-borderDark',
      header: 'bg-white px-3 py-2.5 text-text',
      headerTitle: 'flex min-w-0 flex-1 items-center',
      primaryHeading: 'flex w-full',
      secondaryHeading: 'flex min-w-0 flex-1 items-center pl-4 text-muted',
      itemIndex: 'typography-body-9 mr-1 w-3 flex-none font-bold',
      removeBtn: 'mt-[0.875rem] h-auto p-0 no-underline hover:underline',
      addBtn: 'h-auto p-0 no-underline hover:underline',
      toggleBtn: 'p-0',
      collapsible: '',
      content: 'px-3 pb-5 pt-0 md:px-9 [&_:focus-visible]:focus-outline',
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
