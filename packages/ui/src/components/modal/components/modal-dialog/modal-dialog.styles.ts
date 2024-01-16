import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative mx-auto flex max-w-full flex-col overflow-hidden rounded bg-white outline-none',
      title: 'border-b border-b-heading pb-2 pl-4 pr-5 pt-3 text-lg font-medium',
      close: 'absolute right-1 top-1 block p-1',
    },
    variants: {
      size: {
        full: {
          base: 'w-full flex-1',
        },
        lg: {
          base: 'w-[56.25rem]',
        },
        md: {
          base: 'w-[37.5rem]',
        },
        sm: {
          base: 'w-[18.75rem]',
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
