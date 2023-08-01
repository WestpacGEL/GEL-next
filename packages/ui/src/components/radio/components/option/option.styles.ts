import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex',
      hiddenInput: '',
      svg: 'overflow-visible',
      outerCircle: 'fill-none stroke-hero',
      innerCircle: 'fill-hero',
      focusRing: 'fill-none stroke-focus stroke-2',
      textWrapper: 'flex flex-col justify-center',
      labelText: 'typography-body-10 py-[2px] pl-1',
      hintText: 'typography-body-10 pl-1 text-muted',
    },
    variants: {
      isDisabled: {
        true: {
          outerCircle: 'fill-border-20 stroke-border',
          innerCircle: 'fill-border',
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
