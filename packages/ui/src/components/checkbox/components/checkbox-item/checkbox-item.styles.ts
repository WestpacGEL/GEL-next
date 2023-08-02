import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex',
      hiddenInput: '',
      svg: 'overflow-visible',
      boxRect: 'stroke-hero fill-none',
      innerCheck: 'fill-hero',
      focusRect: 'stroke-focus fill-none stroke-2',
      textWrapper: 'flex justify-center flex-col',
      labelText: 'typography-body-10 py-[2px] pl-1',
      hintText: 'typography-body-10 text-muted pl-1',
    },
    variants: {
      isDisabled: {
        true: {
          boxRect: 'stroke-border fill-border-20',
          innerCheck: 'fill-border',
          labelText: 'text-muted',
        },
        false: {
          base: 'hover:cursor-pointer',
        },
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
          svg: 'h-5 w-5',
          hiddenInput: 'h-5 w-5',
          base: 'mb-2',
        },
        medium: {
          svg: 'h-4 w-4',
          hiddenInput: 'h-4 w-4',
          base: 'mb-1',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
