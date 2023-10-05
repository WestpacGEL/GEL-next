import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'typography-body-9 text-text flex cursor-pointer px-3 py-2 transition-colors hover:bg-white',
    variants: {
      look: {
        default: 'border-border border bg-white',
        material: '',
      },
      selected: {
        true: 'bg-white',
        false: '',
      },
      orientation: {
        horizontal: '',
        vertical: '',
      },
      justify: {
        true: 'flex-1',
      },
      color: {
        primary: '',
        hero: '',
      },
      isFocusVisible: {
        true: 'focus-outline',
        false: 'outline-none',
      },
    },
    compoundVariants: [
      {
        look: 'default',
        selected: false,
        className: 'bg-light',
      },
      {
        orientation: 'horizontal',
        look: 'default',
        className: 'rounded-t-[0.1875rem]',
      },
      {
        orientation: 'vertical',
        look: 'default',
        className: 'rounded-l-[0.1875rem]',
      },
      {
        orientation: 'horizontal',
        selected: true,
        className: 'border-b-0',
      },
      {
        orientation: 'vertical',
        selected: true,
        className: 'border-r-0',
      },
      {
        color: 'primary',
        look: 'default',
        selected: false,
        className: 'border-primary-90 bg-primary hover:bg-primary-70 text-white',
      },
      {
        color: 'hero',
        selected: false,
        look: 'default',
        className: 'border-hero-90 bg-hero hover:bg-hero-70 text-white',
      },
      // Material look design
      {
        look: 'material',
        orientation: 'horizontal',
        className: 'border-r-border border-b-4 border-r border-b-white last:border-r-0',
      },
      {
        look: 'material',
        orientation: 'vertical',
        className: 'border-b-border border-b border-l-4 border-l-white last:border-b-0',
      },
      {
        look: 'material',
        selected: true,
        orientation: 'horizontal',
        className: 'border-bottom text-text border-b-white',
      },
      {
        look: 'material',
        selected: true,
        orientation: 'vertical',
        className: 'border-left text-text border-l-transparent',
      },
      {
        color: 'primary',
        look: 'material',
        selected: true,
        orientation: 'horizontal',
        className: 'border-b-primary border-r-border',
      },
      {
        color: 'hero',
        look: 'material',
        selected: true,
        orientation: 'horizontal',
        className: 'border-b-hero border-r-border',
      },
      {
        color: 'primary',
        look: 'material',
        selected: true,
        orientation: 'vertical',
        className: 'border-b-border border-l-primary',
      },
      {
        color: 'hero',
        look: 'material',
        selected: true,
        orientation: 'vertical',
        className: 'border-b-border border-l-hero',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
