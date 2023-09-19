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
      light: 'fill-white',
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
      className: 'fill-pictogram-duo-highlight',
    },
    {
      mode: 'duo',
      outline: true,
      className: 'fill-pictogram-duo-outline',
    },
  ],
});
