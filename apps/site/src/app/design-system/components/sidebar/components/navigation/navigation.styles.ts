import { tv } from 'tailwind-variants';

export const itemStyles = tv({
  base: 'flex flex-row items-center py-3.5 pr-5 !outline-offset-[-2px] transition-[background] duration-200 ease-[ease] hover:bg-background focus-visible:focus-outline ',
  variants: {
    level: {
      '0': 'pl-6',
      '1': 'pl-14',
      '2': 'pl-[4.75rem]',
    },
    type: {
      link: 'typography-body-11 block',
      button: 'flex h-[2.875rem] w-full items-center justify-between',
    },
    nested: {
      true: 'text-muted',
    },
    active: {
      true: 'font-bold text-primary',
    },
  },
});
