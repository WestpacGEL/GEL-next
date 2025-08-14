import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'typography-body-9 flex cursor-pointer px-3 py-2 text-text-body transition-colors',
    variants: {
      look: {
        default: 'border border-border-muted-soft bg-surface-muted-faint',
        material: '',
      },
      selected: {
        true: 'bg-surface-white-pale',
        false: 'background-transition hover:bg-surface-hover-muted-pale',
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
        className: 'bg-screen-background-faint',
      },
      {
        orientation: 'horizontal',
        look: 'default',
        className: 'rounded-t',
      },
      {
        orientation: 'vertical',
        look: 'default',
        className: 'rounded-l',
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
        className: 'border-border-primary/90 bg-surface-primary text-text-mono hover:bg-surface-hover-primary',
      },
      {
        color: 'hero',
        selected: false,
        look: 'default',
        className: 'border-border-hero/90 bg-surface-hero text-text-mono hover:bg-surface-hover-hero',
      },
      // Material look design
      {
        look: 'material',
        orientation: 'horizontal',
        className: 'border-b-4 border-r border-b-white border-r-border last:border-r-0',
      },
      {
        look: 'material',
        orientation: 'vertical',
        className: 'border-b border-l-4 border-b-border border-l-white last:border-b-0',
      },
      {
        look: 'material',
        selected: true,
        orientation: 'horizontal',
        className: 'border-bottom border-b-white text-text-body',
      },
      {
        look: 'material',
        selected: true,
        orientation: 'vertical',
        className: 'border-left border-l-transparent text-text-body',
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
        className: 'border-b-border border-l-border-primary',
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
