import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'flex items-start typography-body-11 text-text-danger',
    list: 'mb-2 flex flex-col gap-1',
    // below should be em rather than rem based on old GEL
    icon: 'mt-[0.25rem] mr-[0.5em] flex-shrink-0 align-top',
  },
});
