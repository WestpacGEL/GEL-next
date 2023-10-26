import { tv } from 'tailwind-variants';

export const itemStyles = tv({
  base: 'block py-[0.875rem] pr-5 transition-[background] duration-200 ease-[ease] hover:bg-background',
  variants: {
    level: {
      '0': 'pl-6',
      '1': 'pl-[3.5rem]',
      '2': 'pl-[4.75rem]',
    },
    type: {
      link: 'block',
      button: 'flex w-full items-center justify-between',
    },
    nested: {
      true: 'text-muted',
    },
    active: {
      true: 'font-bold text-primary',
    },
  },
});
