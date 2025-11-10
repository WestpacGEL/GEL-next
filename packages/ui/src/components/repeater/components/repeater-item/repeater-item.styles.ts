import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    item: 'pt-1.5',
    itemIndex: 'mb-3 font-bold',
    removeBtn: 'h-auto p-0 no-underline hover:underline',
    collapsible: 'relative',
    content: '',
  },
  variants: {
    separator: {
      true: {
        removeBtn: 'mb-5 md:ml-6',
        item: 'border-y-2 border-y-border-muted-strong',
        content: 'pb-7 md:px-6',
      },
      false: {
        removeBtn: 'absolute top-0 right-0',
        item: 'py-2.5 first:pt-0 last:pb-0',
      },
    },
    lastItem: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      separator: true,
      lastItem: false,
      className: {
        item: 'border-b-0',
      },
    },
  ],
});
