import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'flex flex-col items-center',
    heading: 'typography-body-5 text-text-body mb-3 font-bold',
    link: 'ml-1 cursor-pointer',
    passCode: 'my-3',
    icon: 'mb-3',
  },
});
