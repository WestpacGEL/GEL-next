import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: '',
    popover:
      'border-border-muted-strong bg-background-white-pale absolute z-[999] rounded-xl border shadow-[0_5px_10px_rgba(0,0,0,0.2)]',
    arrow: `before:border-t-border-muted-strong after:border-t-background-white-pale absolute
        -z-10 size-0 before:absolute before:top-[0.5px] before:left-[1px] before:size-0 before:border-x-[7px] before:border-t-[12px] before:border-x-[transparent]
        after:absolute after:top-0 after:left-[1.5px] after:size-0 after:border-x-[6.5px] after:border-t-[11px] after:border-x-[transparent]
      `,
    closeBtn: 'absolute top-1 right-1 h-3 p-0',
    content: 'bg-background-white-pale w-[17.625rem] rounded-xl py-4 pr-5 pl-3',
    heading: 'typography-body-9 text-text-body mb-2 font-medium',
    body: 'typography-body-10 text-text-body',
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
});
