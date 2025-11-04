import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'flex flex-col items-center',
    heading: 'mb-3 typography-body-5 font-bold text-text-body',
    link: 'ml-1 cursor-pointer',
    passCode: 'my-3',
    icon: 'mb-3',
  },
});
