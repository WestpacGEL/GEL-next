import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: '',
    variants: {
      width: {
        auto: 'flex-1',
        full: 'w-full flex-1',
        1: 'w-[1.81ex]',
        2: 'w-[3.62ex]',
        3: 'w-[5.43ex]',
        4: 'w-[7.24ex]',
        5: 'w-[9.05ex]',
        6: 'w-[10.86ex]',
        7: 'w-[12.67ex]',
        8: 'w-[14.48ex]',
        9: 'w-[16.29ex]',
        10: 'w-[18.1ex]',
        20: 'w-[36.2ex]',
        30: 'w-[54.3ex]',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
