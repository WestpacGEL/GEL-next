import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'w-[17.625rem] py-4 pl-3 pr-5',
      heading: 'typography-body-9 font-bold mb-2',
      body: 'typography-body-10',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
