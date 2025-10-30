import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative mx-auto flex max-h-[80vh] max-w-full flex-col overflow-hidden rounded bg-white text-text outline-none',
      title: 'font-bold text-text',
      close: 'absolute right-0 top-0 block p-3',
    },
    variants: {
      size: {
        full: {
          base: 'max-h-screen w-full flex-1',
          close: 'p-2',
          title: 'px-4',
        },
        lg: {
          base: 'w-[50rem]',
          title: 'px-12',
        },
        md: {
          base: 'w-[37.5rem]',
          title: 'px-7 ',
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
        true: { close: 'focus-outline' },
        false: { close: 'outline-none' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
