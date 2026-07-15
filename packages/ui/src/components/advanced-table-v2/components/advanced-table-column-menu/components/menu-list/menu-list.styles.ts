import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    list: 'flex flex-col gap-1 outline-none',
    filterItem: 'p-2',
  },
});
