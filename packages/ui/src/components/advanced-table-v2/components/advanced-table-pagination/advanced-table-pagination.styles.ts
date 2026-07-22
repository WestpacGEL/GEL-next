import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'mt-5 flex flex-col items-center gap-4 sm:flex-row',
    pageSize: 'flex flex-row items-center gap-1',
    pagination: 'items-start',
  },
});
