import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    row: 'group/row',
  },
  variants: {
    background: {
      filled: { row: 'bg-background-white' },
      striped: { row: 'odd:bg-background-white even:bg-surface-muted-faint' },
      transparent: { row: 'hover:bg-surface-hover-muted-pale' },
    },
    isPinned: {
      true: { row: 'bg-background-white shadow-md' },
    },
  },
  defaultVariants: {
    background: 'transparent',
  },
});
