import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative flex max-h-full max-w-full flex-col rounded bg-white text-text outline-none',
      title: 'typography-body-7 pb-4 pt-9 font-bold text-text',
      close: 'absolute right-0 top-0 block p-3',
    },
    variants: {
      size: {
        full: {
          base: 'max-h-screen w-full flex-1',
          close: 'p-2',
          title: 'px-4 py-3',
        },
        lg: {
          base: 'w-[50rem]',
          title: 'px-12 pt-12',
        },
        md: {
          base: 'w-[37.5rem]',
          title: 'px-7',
        },
        sm: {
          base: 'w-[25rem]',
          title: 'px-5',
        },
        fluid: {
          base: 'w-full',
          title: 'px-5',
        },
      },
      isFocusVisible: {
        true: { close: '!outline-offset-[-3px] focus-outline' },
        false: { close: 'outline-none' },
      },
      compact: {
        true: '',
        false: '',
      },
    },
    compoundSlots: [
      {
        slots: ['base'],
        size: ['md', 'lg'],
        compact: true,
        className: 'max-h-[80vh] overflow-hidden',
      },
      {
        slots: ['title'],
        size: ['lg', 'md'],
        compact: true,
        className: 'min-h-[90px] px-5 pb-4 pt-6',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
