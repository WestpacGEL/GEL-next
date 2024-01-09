import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex',
      textWrapper: 'flex flex-col justify-center',
      labelText: 'typography-body-10 py-[2px] pl-1',
      hintText: 'typography-body-10 pl-1 text-muted',
      selector: 'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-hero',
    },
    variants: {
      isDisabled: {
        true: {
          labelText: 'text-muted',
          selector: 'border-border bg-border-20 before:bg-border',
        },
        false: {
          base: 'hover:cursor-pointer',
        },
      },
      isSelected: {
        true: {
          selector: 'before:block before:h-2 before:w-2 before:rounded-full before:bg-hero',
        },
      },
      isFocusVisible: {
        true: { selector: 'focus-outline' },
      },
      orientation: {
        horizontal: {
          base: 'mr-3',
        },
        vertical: {
          base: '',
        },
      },
      size: {
        large: {
          selector: 'h-5 w-5',
          base: 'mb-2',
        },
        medium: {
          selector: 'h-4 w-4',
          base: 'mb-1',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
