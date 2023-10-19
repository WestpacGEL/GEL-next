import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'mb-11 w-full p-0 leading-[2] last:mb-0',
    li: 'typography-body-9 relative mb-2 pl-3',
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
        li: 'before:absolute before:left-0 before:top-[0.5rem] before:block before:h-[0.5rem] before:w-[0.5rem] before:rounded-full last:mb-0',
      },
    },
  },
});
