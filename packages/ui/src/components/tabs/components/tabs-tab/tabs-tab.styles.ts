import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'flex cursor-pointer px-3 py-2 typography-body-9 text-text-body transition-colors',
  variants: {
    look: {
      default: 'border border-border-muted-soft bg-surface-muted-faint',
      material: '',
    },
    selected: {
      true: 'bg-background-white-pale',
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
      className: 'bg-surface-muted-faint',
    },
    {
      orientation: 'horizontal',
      look: 'default',
      className: 'rounded-t-xl',
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
      className: 'border-r border-b-4 border-r-border-muted-soft border-b-transparent last:border-r-0',
    },
    {
      look: 'material',
      orientation: 'vertical',
      className: 'border-b border-l-4 border-b-border-muted-soft border-l-transparent last:border-b-0',
    },
    {
      look: 'material',
      selected: true,
      orientation: 'horizontal',
      className: 'text-text-body',
    },
    {
      look: 'material',
      selected: true,
      orientation: 'vertical',
      className: 'border-l-transparent text-text-body',
    },
    {
      color: 'primary',
      look: 'material',
      selected: true,
      orientation: 'horizontal',
      className: 'border-b-border-primary',
    },
    {
      color: 'hero',
      look: 'material',
      selected: true,
      orientation: 'horizontal',
      className: 'border-b-border-hero',
    },
    {
      color: 'primary',
      look: 'material',
      selected: true,
      orientation: 'vertical',
      className: 'border-b-border-muted-soft border-l-border-primary',
    },
    {
      color: 'hero',
      look: 'material',
      selected: true,
      orientation: 'vertical',
      className: 'border-b-border-muted-soft border-l-border-hero',
    },
  ],
});
