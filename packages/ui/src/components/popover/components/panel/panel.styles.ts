import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      underlay: 'fixed inset-0 ',
      popover: 'border-muted rounded-[3px] border bg-white',
      arrow:
        'border-t-muted absolute h-0 w-0 border-x-[8px] border-t-[12px] border-x-[transparent] after:absolute after:h-0 after:w-0 after:border-x-[7px] after:border-t-[11px] after:border-x-[transparent] after:border-t-white',
      closeBtn: 'focus:focus-outline absolute right-1 top-1 m-1 p-0 hover:opacity-80',
    },
    variants: {
      placement: {
        top: { arrow: 'top-full -translate-x-1/2 after:top-[-12px] after:translate-x-[-7px]' },
        bottom: { arrow: 'bottom-full -translate-x-1/2 rotate-180 after:bottom-[1px] after:translate-x-[-7px]' },
        left: { arrow: 'left-[99.5%] -translate-y-1/2 -rotate-90 after:left-[-7px] after:translate-y-[-13px]' },
        right: { arrow: 'right-[99.5%] -translate-y-1/2 rotate-90 after:right-[-7px] after:translate-y-[-13px]' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
