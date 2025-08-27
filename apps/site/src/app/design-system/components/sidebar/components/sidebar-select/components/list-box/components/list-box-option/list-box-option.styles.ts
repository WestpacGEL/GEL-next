import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'border-t-border-muted-soft bg-background-white-pale hover:bg-background-white-faint focus:bg-background-white-faint box-border flex h-10 cursor-pointer items-center justify-between border-t px-3 py-2.5 outline-none transition-colors first:border-t-0',
    variants: {
      isFocusVisible: {
        true: 'bg-light !outline-offset-[-2px] focus-outline',
      },
      isSelected: {
        true: 'text-text-primary font-bold',
      },
      isDisabled: {
        true: 'text-muted',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
