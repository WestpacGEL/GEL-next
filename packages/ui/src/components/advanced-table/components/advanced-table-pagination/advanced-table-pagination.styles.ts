import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'flex flex-row items-center pt-5',
    pagination: 'items-start',
    range: 'px-4',
    pageSize: 'flex flex-row items-center gap-1',
  },
});
