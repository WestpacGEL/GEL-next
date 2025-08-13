import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'max-w-5xl bg-surface-white-pale p-6 pb-0 rounded-lg border border-border-muted-soft',
    displayWrapper: 'relative -mx-6 -mt-6 border-border-muted-soft px-6',
    error: 'flex gap-2 rounded-md bg-danger-10 p-2 text-danger-90',
    buttonWrapper: '-mx-6 -mb-6 flex items-center justify-end ',
    codeWrapper: 'relative -mx-6 border-t border-border-muted-soft bg-[#282c34] p-3.5 font-monospace text-base leading-loose',
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
