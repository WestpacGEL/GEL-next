import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: '',
    list: 'm-0 flex list-none flex-col pl-0',
    item: 'relative',
    itemIndex: 'mb-3 font-bold',
    content: '[&_:focus-visible]:focus-outline',
    removeBtn: 'absolute top-0 right-0 h-auto p-0 no-underline hover:underline',
    footer: 'flex justify-between pt-[0.875rem]',
    addBtn: 'h-auto p-0 no-underline hover:underline',
  },
  variants: {
    separator: {
      false: {
        list: 'gap-5',
      },
      true: {
        item: 'border-t-2 border-border-muted-strong pt-[0.625rem]',
        content: 'px-0 pt-0 pb-7 md:px-6',
        removeBtn: 'relative mb-5 md:ml-6',
        footer: 'border-t-2 border-border-muted-strong',
      },
    },
    isFocused: {
      true: {
        item: 'outline-none',
      },
    },
  },
});
