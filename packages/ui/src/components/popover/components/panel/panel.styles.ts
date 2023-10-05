import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      popover: 'border-muted absolute z-[999] rounded-[3px] border bg-white shadow-[0_5px_10px_rgba(0,0,0,0.2)]',
      arrow:
        'border-t-muted absolute h-0 w-0 border-x-[8px] border-t-[12px] border-x-[transparent] after:absolute after:h-0 after:w-0 after:border-x-[7px] after:border-t-[11px] after:border-x-[transparent] after:border-t-white',
      closeBtn: 'absolute right-1 top-1 m-1 p-0 hover:opacity-80',
      content: 'w-[17.625rem] py-4 pl-3 pr-5',
      heading: 'typography-body-9 mb-2 font-bold',
      body: 'typography-body-10',
    },
    variants: {
      placement: {
        top: {
          popover: 'bottom-full left-1/2 mb-[0.9375rem] -translate-x-1/2',
          arrow: 'left-1/2 top-full -translate-x-1/2 after:top-[-12px] after:translate-x-[-7px]',
        },
        bottom: {
          popover: 'left-1/2 top-full mt-[0.9375rem] -translate-x-1/2',
          arrow: 'bottom-full left-1/2 -translate-x-1/2 rotate-180 after:bottom-[1px] after:translate-x-[-7px]',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
