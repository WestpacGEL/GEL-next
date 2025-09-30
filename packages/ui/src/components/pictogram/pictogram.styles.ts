import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'inline-block shrink-0 leading-none',
});

export const fill = tv({
  base: '',
  variants: {
    mode: {
      dark: 'fill-surface-pictogram-base',
      light: 'fill-surface-mono',
      reversed: 'fill-surface-reversed',
      duo: '',
    },
    highlight: {
      true: '',
    },
    outline: {
      true: '',
    },
  },
  compoundVariants: [
    {
      mode: 'duo',
      highlight: true,
      className: 'fill-surface-pictogram-accent',
    },
    {
      mode: 'duo',
      outline: true,
      className: 'fill-surface-pictogram-base',
    },
  ],
});
