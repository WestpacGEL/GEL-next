import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'flex flex-col items-center justify-center gap-2 px-4 py-10 text-center',
    icon: 'mb-2 text-text-muted',
    title: 'typography-body-7 font-bold',
    description: 'typography-body-9 text-text-muted',
  },
});
