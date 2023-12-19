import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex flex-col items-center',
      heading: 'typography-body-5 mb-3 font-bold',
      link: 'ml-1 cursor-pointer',
      passCode: 'my-3',
      icon: 'mb-3',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
