import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'mb-2 w-full p-0 leading-[2] sm:w-9/12',
    li: 'typography-body-9 relative mb-2 pl-3',
  },
  variants: {
    type: {
      ordered: {
        base: 'list-decimal',
      },
      unordered: {
        base: '',
        li: 'before:absolute before:left-0 before:top-[0.5rem] before:block before:h-[0.5rem] before:w-[0.5rem] before:rounded-full before:bg-black',
      },
    },
  },
});
