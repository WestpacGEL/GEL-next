import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative flex max-h-full max-w-full flex-col rounded-3xl bg-background-white-pale text-text-body outline-none',
    title: 'pt-9 pb-4 typography-body-7 font-bold text-text-body',
    close: 'absolute top-0 right-0 block cursor-pointer p-3',
  },
  variants: {
    size: {
      full: {
        base: 'h-screen max-h-screen w-full flex-1 rounded-none',
        close: 'p-2',
        title: 'px-4 py-3',
      },
      lg: {
        base: 'w-[50rem]',
        title: 'px-12 pt-12',
      },
      md: {
        base: 'w-[37.5rem]',
        title: 'px-7',
      },
      sm: {
        base: 'w-[25rem]',
        title: 'px-5',
      },
      fluid: {
        base: 'w-screen',
        title: 'px-5',
      },
    },
    isFocusVisible: {
      true: { close: 'focus-outline !outline-offset-[-4px]' },
      false: { close: 'outline-none' },
    },
    compact: {
      true: '',
      false: '',
    },
  },
  compoundSlots: [
    {
      slots: ['base'],
      size: ['md', 'lg'],
      compact: true,
      className: 'max-h-[80vh] overflow-hidden',
    },
    {
      slots: ['title'],
      size: ['lg', 'md'],
      compact: true,
      className: 'min-h-[90px] px-5 pt-6 pb-4',
    },
  ],
});
