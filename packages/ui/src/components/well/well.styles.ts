import { cva } from 'class-variance-authority';

export const styles = cva('rounded border border-border p-2 sm:p-4', {
  variants: {
    color: {
      light: 'bg-light',
      white: 'bg-white',
    },
  },
});
