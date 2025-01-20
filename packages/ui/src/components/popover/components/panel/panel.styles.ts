import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      popover: 'absolute z-[999] rounded border border-muted bg-white shadow-[0_5px_10px_rgba(0,0,0,0.2)]',
      arrow:
        'absolute size-0 border-x-8 border-t-[12px] border-x-[transparent] border-t-muted after:absolute after:size-0 after:border-x-[7px] after:border-t-[11px] after:border-x-[transparent] after:border-t-white',
      closeBtn: 'absolute right-1 top-1 m-1 p-0 hover:opacity-80',
      content: 'w-[17.625rem] py-4 pl-3 pr-5',
      heading: 'typography-body-9 mb-2 font-bold text-text',
      body: 'typography-body-10 text-text',
    },
    variants: {
      placement: {
        top: {
          popover: 'bottom-full mb-2.5',
          arrow: 'top-full after:top-[-12px] after:translate-x-[-7px]',
        },
        bottom: {
          popover: 'top-full mt-2.5',
          arrow: 'bottom-full rotate-180 after:bottom-[1px] after:translate-x-[-7px]',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
