import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      popover: 'absolute z-[999] rounded-[3px] border border-muted bg-white shadow-[0_5px_10px_rgba(0,0,0,0.2)]',
      arrow: `absolute -z-10 size-0
        before:absolute before:left-[1px] before:top-[0.5px] before:size-0 before:border-x-[7px] before:border-t-[12px] before:border-x-[transparent] before:border-t-muted after:absolute
        after:left-[1.5px] after:top-0 after:size-0 after:border-x-[6.5px] after:border-t-[11px] after:border-x-[transparent] after:border-t-white
      `,
      closeBtn: 'absolute right-1 top-1 h-3 p-0 hover:opacity-80',
      content: 'w-[17.625rem] rounded-[3px] bg-white py-4 pl-3 pr-5',
      heading: 'typography-body-9 mb-2 font-medium text-text focus-visible:focus-outline',
      body: 'typography-body-10 text-text focus-visible:focus-outline',
    },
    variants: {
      placement: {
        top: {
          popover: '-mt-2 mb-2',
          arrow: 'top-full translate-x-[-6px] translate-y-0',
        },
        bottom: {
          popover: 'mt-2',
          arrow: 'bottom-full translate-x-[6px] rotate-180 after:bottom-[1px]',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
