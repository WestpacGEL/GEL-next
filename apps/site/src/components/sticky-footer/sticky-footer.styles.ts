import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    footer:
      'border-t-border-muted-soft bg-background-white-pale fixed inset-x-0 z-10 flex h-8 items-center justify-between border-t py-1 pr-3 pl-4 leading-none transition-[bottom] duration-[0.4s] ease-[ease]',
    icons: 'flex gap-2',
    button: 'focus-visible:focus-outline no-underline',
  },
  variants: {
    isDesignSystem: {
      true: {
        footer: 'lg:left-[18.75rem]',
        icons: 'text-muted',
      },
      false: {
        icons: 'text-gel-icon',
        button: 'text-gel-icon',
      },
    },
    visible: {
      true: {
        footer: 'bottom-0',
      },
      false: {
        footer: '-bottom-8 ',
      },
    },
  },
});
