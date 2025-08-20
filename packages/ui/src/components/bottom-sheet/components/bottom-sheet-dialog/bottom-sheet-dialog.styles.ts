import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      header: 'relative',
      base: 'flex max-h-screen max-w-full flex-1 flex-col overflow-hidden rounded-t-md bg-surface-white-pale shadow-sm md:w-[37.5rem] md:rounded-md',
      title: 'typography-body-7 p-7 pb-4 pt-9 font-bold text-text-body max-md:px-5',
      body: 'flex-1 overflow-auto px-7 pb-7 text-text-body max-md:px-5',
      closeBtn: 'absolute right-3 top-3 p-0',
      buttonWrapper: '-mt-2 flex gap-1 px-7 pb-7 max-md:flex-col max-md:px-5 max-md:pb-5',
      primaryBtn: '',
      secondaryBtn: 'no-underline hover:underline',
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
