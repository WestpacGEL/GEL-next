import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex',
      checkIcon: 'overflow-visible',
      textWrapper: 'flex flex-col justify-center',
      labelText: 'typography-body-10 py-[2px] pl-1',
      hintText: 'typography-body-10 text-muted pl-1',
      checkbox: 'border-hero flex h-4 w-4 items-center justify-center rounded border',
    },
    variants: {
      isDisabled: {
        true: {
          labelText: 'text-muted',
          checkbox: 'border-border bg-border-20',
        },
        false: {
          base: 'hover:cursor-pointer',
        },
      },
      isFocused: {
        true: { checkbox: 'focus-outline' },
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
          checkIcon: 'h-5 w-5',
          base: 'mb-2',
          checkbox: 'h-5 w-5',
        },
        medium: {
          checkIcon: 'h-4 w-4',
          base: 'mb-1',
          checkbox: 'h-4 w-4',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
