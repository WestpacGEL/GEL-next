import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    header: 'relative',
    base: 'bg-background-white-pale flex max-h-screen max-w-full flex-1 flex-col overflow-hidden rounded-t-3xl shadow-sm md:w-[37.5rem] md:rounded-3xl',
    title: 'typography-body-7 text-text-body p-7 pt-9 pb-4 font-bold max-md:px-5',
    body: 'text-text-body flex-1 overflow-auto px-7 pb-7 max-md:px-5',
    closeBtn: 'absolute top-3 right-3 p-0',
    buttonWrapper: '-mt-2 flex gap-1 px-7 pb-7 max-md:flex-col max-md:px-5 max-md:pb-5',
    primaryBtn: '',
    secondaryBtn: 'no-underline hover:underline',
  },
});
