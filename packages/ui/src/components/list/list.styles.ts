import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'typography-body-10 text-text-body list-none',
  },
  variants: {
    type: {
      bullet: {},
      link: {},
      tick: {},
      cross: {},
      unstyled: {},
      icon: {},
      ordered: {
        base: 'list-decimal ps-[1.25rem]',
      },
    },
    nested: {
      true: { base: 'pl-4' },
    },
  },
});
