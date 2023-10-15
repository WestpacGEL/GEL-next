import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      list: 'm-0 list-none pl-0',
      item: 'relative',
      itemIndex: 'mb-[1.125rem] font-bold',
      content: '',
      removeBtn: 'absolute right-0 top-0 h-auto p-0 no-underline hover:underline',
      footer: 'flex justify-between',
      addBtn: 'height-auto p-0 no-underline hover:underline',
    },
    variants: {
      separator: {
        true: {
          item: 'border-neutral border-t-2 pt-[0.625rem]',
          content: 'p-[0_1.125rem_2.625rem]',
          removeBtn: 'relative m-[0_0_1.875rem_1.125rem]',
          footer: 'border-neutral border-t-2 pt-[0.875rem]',
        },
      },
      isFocused: {
        true: {
          item: 'outline-none',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
