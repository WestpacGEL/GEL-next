import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      popover: 'absolute z-[999] rounded border border-muted bg-white shadow-[0_5px_10px_rgba(0,0,0,0.2)]',
      arrow: `absolute -z-10 size-0
        before:absolute before:left-0 before:top-0 before:size-0 before:border-x-[7px] before:border-t-[12px] before:border-x-[transparent] before:border-t-muted after:absolute
        after:left-0 after:top-0 after:size-0 after:border-x-[7px] after:border-t-[11px] after:border-x-[transparent] after:border-t-white
      `,
      closeBtn: 'absolute right-1 top-1 m-1 p-0 hover:opacity-80',
      content: 'w-[17.625rem] bg-white py-4 pl-3 pr-5',
      heading: 'typography-body-9 mb-2 font-bold text-text',
      body: 'typography-body-10 text-text',
    },
    variants: {
      placement: {
        top: {
          popover: '-mt-2.5 mb-2.5',
          arrow: 'top-full translate-x-[-6px] translate-y-[-1px]',
        },
        bottom: {
          popover: 'mt-2.5',
          arrow: 'bottom-full translate-x-[6px] rotate-180 after:bottom-[1px]',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
