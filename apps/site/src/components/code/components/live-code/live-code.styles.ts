import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'max-w-5xl overflow-hidden bg-white p-6 pb-0',
    displayWrapper: 'border-muted-50 relative -mx-6 -mt-6 p-6',
    error: 'bg-danger-10 text-danger-90 flex gap-2 rounded-md p-2',
    buttonWrapper: '-mx-6 -mb-6 flex items-center justify-end ',
    codeWrapper: 'border-muted-50 relative -mx-6 border-t',
    arrowIcon: 'transition-transform',
    copyCodeButton:
      'typography-body-10 absolute right-0 top-0 p-1 pr-2 text-white opacity-50 transition-opacity hover:opacity-100',
  },
  variants: {
    language: {
      html: {
        base: 'bg-transparent',
        displayWrapper: 'p-0',
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
