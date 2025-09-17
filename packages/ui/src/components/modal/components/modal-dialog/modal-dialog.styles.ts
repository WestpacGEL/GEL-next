import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'bg-background-white-pale text-text-body relative mx-auto flex max-w-full flex-col overflow-hidden rounded-3xl outline-none',
    title: 'typography-body-7 text-text-body pt-9 pb-4 font-bold',
    close: 'absolute top-0 right-0 block p-3',
  },
  variants: {
    size: {
      full: {
        base: 'max-h-screen w-full flex-1',
        close: 'p-2',
        title: 'px-4 py-3',
      },
      lg: {
        base: 'w-[50rem]',
        title: 'px-12 pt-12',
      },
      md: {
        base: 'w-[37.5rem]',
        title: 'px-7 ',
      },
      sm: {
        base: 'w-[25rem]',
        title: 'px-5',
      },
      fluid: {
        base: 'w-full',
        title: 'px-5',
      },
    },
    isFocusVisible: {
      true: { close: 'focus-outline' },
      false: { close: 'outline-none' },
    },
  },
});
