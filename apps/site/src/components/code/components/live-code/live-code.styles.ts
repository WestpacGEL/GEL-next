import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'border-border-muted-soft bg-background-white-pale max-w-5xl rounded-xl border p-6 pb-0',
    displayWrapper: 'border-border-muted-soft relative -mx-6 -mt-6 px-6',
    error: 'text-text-danger flex gap-2 rounded-md bg-danger-10 p-2',
    buttonWrapper: '-mx-6 -mb-6 flex items-center justify-end ',
    codeWrapper:
      'border-border-muted-soft relative -mx-6 rounded-b-xl border-t bg-[#282c34] p-3.5 font-monospace text-base leading-loose',
    arrowIcon: 'transition-transform',
    copyCodeButton:
      'typography-body-10 absolute right-0 top-0 p-1 pr-2 text-white opacity-50 transition-opacity hover:opacity-100',
  },
  variants: {
    language: {
      html: {
        base: 'bg-transparent rounded-none border-none',
        displayWrapper: '!p-0',
      },
    },
    showResponsiveDemo: {
      true: {
        displayWrapper: 'pb-6 pt-9',
      },
      false: {
        displayWrapper: 'py-6',
      },
    },
    isCodeVisible: {
      true: {
        codeWrapper: 'block',
        arrowIcon: '-rotate-90',
      },
      false: {
        codeWrapper: 'hidden',
        arrowIcon: 'rotate-90',
      },
    },
  },
});
