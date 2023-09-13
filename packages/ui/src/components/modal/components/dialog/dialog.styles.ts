import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative mx-auto max-w-full overflow-hidden rounded-[0.1875rem] bg-white focus:focus-outline',
      title: 'border-b border-b-heading pb-2 pl-4 pr-5 pt-3 text-lg font-medium',
      close: 'absolute right-1 top-1 block p-1 focus:focus-outline',
    },
    variants: {
      size: {
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
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
