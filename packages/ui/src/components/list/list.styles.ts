import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'typography-body-10 list-none',
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
          base: 'list-inside list-decimal',
        },
      },
      nested: {
        true: { base: 'pl-4' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
