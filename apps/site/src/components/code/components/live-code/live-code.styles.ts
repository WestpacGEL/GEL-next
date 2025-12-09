import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: `
      max-w-5xl rounded-3xl border border-border-muted-soft
      bg-background-white p-6 pb-0
    `,
    displayWrapper: `
      relative -mx-6 -mt-6 overflow-auto border-border-muted-soft px-6
    `,
    error: 'flex gap-2 rounded-md bg-surface-danger-faint p-2 text-text-danger',
    buttonWrapper: '-mx-6 -mb-6 flex items-center justify-end',
    codeWrapper: `
      relative -mx-6 rounded-b-3xl border-t border-border-muted-soft
      bg-[#282c34] p-3.5 font-mono text-base leading-loose
    `,
    arrowIcon: 'transition-transform',
    copyCodeButton: `
      absolute top-0 right-0 p-1 pr-2 typography-body-10 text-white opacity-50
      transition-opacity
      hover:opacity-100
      focus-visible:z-10 focus-visible:opacity-100
      focus-visible:focus-outline focus-visible:!outline-offset-[-2px]
    `,
  },
  variants: {
    language: {
      html: {
        base: 'rounded-none border-none bg-transparent',
        displayWrapper: '!p-0',
      },
    },
    showResponsiveDemo: {
      true: {
        displayWrapper: 'pt-9 pb-6',
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
