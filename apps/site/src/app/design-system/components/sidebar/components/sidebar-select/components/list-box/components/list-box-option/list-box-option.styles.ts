import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'box-content flex h-[2.5rem] cursor-pointer items-center justify-between border-t border-t-border bg-white px-3 py-[0.625rem] transition-colors first:border-t-0 hover:bg-light focus:bg-light',
    variants: {
      isFocused: {
        true: 'bg-light',
      },
      isSelected: {
        true: 'font-bold text-primary',
      },
      isDisabled: {
        true: 'text-muted',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
