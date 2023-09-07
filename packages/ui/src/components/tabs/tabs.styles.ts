import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex',
      tabList: 'relative z-10 flex',
    },
    variants: {
      orientation: {
        horizontal: {
          base: 'flex-col',
          tabList: 'mb-[-1px] flex-row',
        },
        vertical: {
          base: 'flex-row',
          tabList: 'mr-[-1px] flex-col',
        },
      },
      look: {
        default: {
          tabList: 'gap-[2px]',
        },
        material: '',
      },
      sticky: {
        true: {
          tabList: 'sticky shadow-md shadow-black/10',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
