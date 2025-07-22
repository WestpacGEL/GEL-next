import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex flex-col items-center',
      heading: 'typography-body-5 mb-3 font-bold text-text-body',
      link: 'ml-1 cursor-pointer',
      passCode: 'my-3',
      icon: 'mb-3 text-text-body',
    },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
