import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'typography-body-11 flex items-center text-danger',
    list: 'mb-2 flex flex-col gap-1',
    // below should be em rather than rem based on old GEL
    icon: 'mr-[0.5em] align-top',
  },
});
