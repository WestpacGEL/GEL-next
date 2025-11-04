import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'max-w-5xl bg-white p-6 pb-0',
    displayWrapper: 'relative -mx-6 -mt-6 border-muted-50 px-6',
    error: 'flex gap-2 rounded-md bg-danger-10 p-2 text-danger-90',
    buttonWrapper: '-mx-6 -mb-6 flex items-center justify-end ',
    codeWrapper:
      'relative -mx-6 border-t border-muted-50 bg-[#282c34] p-[0.875rem] font-monospace text-base leading-loose',
    arrowIcon: 'transition-transform',
    copyCodeButton:
      'typography-body-10 absolute right-0 top-0 p-1 pr-2 text-white opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:!outline-offset-[-2px] focus-visible:focus-outline',
  },
  variants: {
    language: {
      html: {
        base: 'bg-[transparent]',
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
