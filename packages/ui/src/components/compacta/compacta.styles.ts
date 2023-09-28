import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      item: 'border-borderDark mb-2 overflow-hidden rounded-[0.1875rem] border',
      header: 'text-text bg-white p-[0.8125rem_1.125rem]',
      headerTitle: 'flex min-w-0 flex-1 items-center',
      primaryHeading: 'my-[16px] flex',
      secondaryHeading: 'text-muted flex min-w-0 flex-1 items-center pl-[2.25rem]',
      itemIndex: 'mr-2 w-4 flex-none font-bold',
      removeBtn: 'mt-[0.875rem] h-auto p-0 no-underline hover:underline',
      addBtn: 'h-auto p-0 no-underline hover:underline',
      toggleBtn: 'ml-auto p-0 focus:outline-focus',
      collapsible: '',
      content: 'xsl:pl-[3.375rem] p-[0_1.125rem_1.875rem]',
      footer: 'pt-[0.5rem]',
      titlePrimary: 'mr-2 flex-1 truncate font-bold',
      titleSecondary: 'mr-2 mt-[0.125rem] flex-1 truncate',
      titleTertiary: 'mr-2 mt-[0.125rem] flex-1 truncate',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
