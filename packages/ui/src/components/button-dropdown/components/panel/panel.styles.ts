import { tv } from 'tailwind-variants';

// eslint-disable-next-line tailwindcss/no-custom-classname
export const styles = tv(
  {
    slots: {
      base: 'border-border mt-[0.1875rem] rounded-[3px] border bg-white p-2 shadow-[0_0.375rem_0.75rem_rgba(0,0,0,0.175)]',
      dialog: '',
    },
    variants: {
      isFocused: {
        true: {
          dialog: 'outline-none',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
