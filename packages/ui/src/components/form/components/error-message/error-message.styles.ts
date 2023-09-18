import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'typography-body-10 flex items-center text-danger',
      list: 'mb-2 flex flex-col gap-1',
      icon: 'mr-[0.5rem] mt-[mr-0.25rem] align-top',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
