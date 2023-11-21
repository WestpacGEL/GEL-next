import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'my-4 w-full p-0 leading-[2] last:mb-0',
    li: 'relative mb-2 pl-[1.1875rem] leading-7',
  },
  variants: {
    color: {
      default: {
        li: 'before:bg-black',
      },
      blue: {
        li: 'before:bg-gel-icon',
      },
    },
    type: {
      ordered: {
        base: 'list-decimal',
      },
      unordered: {
        base: '',
        li: 'leading-normal before:absolute before:left-[0.25rem] before:top-1 before:block before:h-[0.5rem] before:w-[0.5rem] before:rounded-full last:mb-0',
      },
    },
    fontFamily: {
      default: {
        li: 'typography-body-9',
      },
      graphik: {
        li: 'typography-site-9',
      },
    },
  },
});
