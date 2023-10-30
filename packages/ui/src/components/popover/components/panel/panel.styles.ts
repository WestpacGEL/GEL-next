import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      popover: 'absolute z-[999] rounded-[0.1875rem] border border-muted bg-white shadow-[0_5px_10px_rgba(0,0,0,0.2)]',
      arrow:
        'absolute h-0 w-0 border-x-[8px] border-t-[12px] border-x-[transparent] border-t-muted after:absolute after:h-0 after:w-0 after:border-x-[7px] after:border-t-[11px] after:border-x-[transparent] after:border-t-white',
      closeBtn: 'absolute right-1 top-1 m-1 p-0 hover:opacity-80',
      content: 'w-[17.625rem] py-4 pl-3 pr-5',
      heading: 'typography-body-9 mb-2 font-bold',
      body: 'typography-body-10',
    },
    variants: {
      placement: {
        top: {
          popover: 'bottom-full mb-[0.9375rem]',
          arrow: 'top-full after:top-[-12px] after:translate-x-[-6.5px]',
        },
        bottom: {
          popover: 'top-full mt-[0.9375rem]',
          arrow: 'bottom-full rotate-180 after:bottom-[1px] after:translate-x-[-6.5px]',
        },
      },
      offset: {
        left: {
          popover: '-translate-x-1/2',
        },
        right: {
          popover: '',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
