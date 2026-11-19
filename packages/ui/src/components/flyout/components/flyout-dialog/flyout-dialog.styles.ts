import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'fixed inset-y-0 flex w-50 flex-col bg-background-white transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
    body: 'min-h-0 flex-1 overflow-auto',
    button: 'ml-auto shrink-0',
    content: 'flex h-full flex-col',
    header: 'flex h-9 w-full shrink-0 items-center pl-2',
    heading: 'min-w-0 typography-body-10 font-bold text-text-body',
  },
  variants: {
    isEntering: {
      true: {},
    },
    isOpen: {
      true: {
        base: 'translate-x-0',
      },
      false: {
        content: 'hidden',
      },
    },
    position: {
      left: {
        base: 'left-0 border-r border-border-muted-soft',
      },
      right: {
        base: 'right-0 border-l border-border-muted-soft',
      },
    },
  },
  compoundSlots: [
    {
      slots: ['base'],
      isOpen: false,
      position: 'left',
      className: '-translate-x-full',
    },
    {
      slots: ['base'],
      isOpen: false,
      position: 'right',
      className: 'translate-x-full',
    },
    {
      slots: ['base'],
      isEntering: true,
      position: 'left',
      className: '-translate-x-full',
    },
    {
      slots: ['base'],
      isEntering: true,
      position: 'right',
      className: 'translate-x-full',
    },
  ],
});
