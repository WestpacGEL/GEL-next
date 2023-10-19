import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'max-w-5xl overflow-hidden rounded-md border border-muted-50 bg-white p-4 pb-0',
      displayWrapper: 'relative -mx-4 -mt-4 border-muted-50 p-4',
      error: 'flex gap-2 rounded-md bg-danger-10 p-2 text-danger-90',
      buttonWrapper: 'absolute right-0 top-0 flex items-center justify-center rounded bg-white/50',
      codeWrapper: 'relative -mx-4 border-t border-muted-50',
      copyCodeButton:
        'typography-body-10 absolute right-0 top-0 p-1 pr-2 text-white opacity-50 transition-opacity hover:opacity-100',
    },
    variants: {
      isCodeVisible: {
        true: {
          codeWrapper: 'hidden',
        },
        false: {
          codeWrapper: 'block',
        },
      },
      type: {
        inline: {
          base: 'items-baseline text-link',
          iconBefore: 'self-center',
          iconAfter: 'self-center',
        },
        standalone: {
          base: 'items-center text-text',
        },
      },
      underline: {
        true: '',
      },
      isFocusVisible: {
        true: { base: 'focus-outline' },
        false: { base: 'outline-none' },
      },
    },
    compoundSlots: [
      {
        slots: ['base'],
        type: 'inline',
        underline: true,
        className: 'underline hover:no-underline',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
