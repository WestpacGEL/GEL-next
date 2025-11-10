import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'flex flex-1 flex-col gap-1 overflow-x-clip',
  variants: {
    isLink: {
      true: 'group/dualaction',
    },
    isFocusVisible: {
      true: 'focus-outline',
    },
    multipleChildren: {
      true: { base: '' },
    },
  },
});
