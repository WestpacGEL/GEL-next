import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      item: 'mb-2 overflow-hidden rounded-[0.1875rem] border border-borderDark',
      header: 'bg-white p-[0.8125rem_1.125rem] text-text',
      headerTitle: 'flex min-w-0 flex-1 items-center',
      primaryHeading: 'my-[16px] flex',
      secondaryHeading: 'flex min-w-0 flex-1 items-center pl-[2.25rem] text-muted',
      itemIndex: 'mr-2 w-4 flex-none font-bold',
      removeBtn: 'mt-[0.875rem] h-auto p-0 no-underline hover:underline',
      addBtn: 'h-auto p-0 no-underline hover:underline',
      toggleBtn: 'ml-auto p-0',
      collapsible: '',
      content: 'p-[0_1.125rem_1.875rem] xsl:pl-[3.375rem]',
      footer: 'pt-[0.5rem]',
      titlePrimary: 'font-bold',
      titleSecondary: 'mt-[0.125rem]',
      titleTertiary: 'mt-[0.125rem]',
    },
    variants: {},
    compoundSlots: [
      {
        slots: ['titlePrimary', 'titleSecondary', 'titleTertiary'],
        class: ['mr-2', 'truncate', 'flex-1'],
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
