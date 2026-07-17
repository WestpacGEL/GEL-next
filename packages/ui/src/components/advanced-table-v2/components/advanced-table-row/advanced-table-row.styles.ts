import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    // TODO(tickets 11/14): focus outline carried over from the old component.
    // Nothing makes a row focusable yet — re-check it's still required once
    // editing / the a11y hardening pass land.
    row: 'group/row outline-offset-[-1px] focus:outline-border-focus',
  },
  variants: {
    background: {
      transparent: { row: 'hover:bg-surface-hover-muted-pale' },
      striped: { row: 'odd:bg-background-white even:bg-surface-muted-faint' },
      filled: { row: 'bg-background-white' },
    },
    isPinned: {
      true: { row: 'bg-background-white shadow-md' },
    },
  },
  defaultVariants: {
    background: 'transparent',
  },
});
