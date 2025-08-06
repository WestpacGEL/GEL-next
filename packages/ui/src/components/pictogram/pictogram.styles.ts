import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'inline-block shrink-0 leading-none',
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);

export const fill = tv({
  base: '',
  variants: {
    mode: {
      dark: 'fill-pictogram-dark',
      light: 'fill-surface-white-pale',
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
