import { tv } from 'tailwind-variants';

export const itemStyles = tv({
  base: 'hover:bg-surface-hover-muted-pale focus-visible:focus-outline flex flex-row items-center py-2.5 pr-5 !outline-offset-[-2px] transition-[background] duration-200 ease-[ease] ',
  variants: {
    level: {
      '0': 'pl-6',
      '1': 'pl-9.5',
      '2': 'pl-12.5',
    },
    type: {
      link: 'typography-body-11 block',
      button: 'flex h-[2.875rem] w-full items-center justify-between',
    },
    nested: {
      true: 'text-text-muted',
    },
    active: {
      true: 'text-text-primary font-bold',
    },
  },
});
