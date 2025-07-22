import { tv } from 'tailwind-variants';

/**
 * Current GEL design not using design tokens in some cases. Because of that, we need specify numeric values such as pb-[0.25rem] for spacing
 */
export const styles = tv(
  {
    slots: {
      base: 'items-center justify-center rounded transition-[background] disabled:pointer-events-none disabled:opacity-50 group-first/add-on-before:rounded-r-none group-last/add-on-after:rounded-l-none',
      iconBefore: '',
      iconAfter: '',
      dropdown: 'ml-[0.4em]',
      text: 'overflow-hidden text-ellipsis',
    },
    variants: {
      size: {
        small: {
          base: 'typography-body-10 h-5 px-1.5 active-theme-rams:before:h-[0.0625rem]',
        },
        medium: {
          base: 'typography-body-9 h-6 px-2 active-theme-rams:before:h-0.5',
        },
        large: {
          base: 'typography-body-9 h-7 px-2.5 active-theme-rams:before:h-0.5',
        },
        xlarge: {
          base: 'typography-body-8 h-8 px-3 active-theme-rams:before:h-1',
        },
      },
      look: {
        primary: {
          base: 'relative border border-border-primary bg-surface-primary text-text-mono hover:bg-surface-primary active:bg-surface-primary-faint active-theme-rams:border-b-pop active-theme-rams:before:absolute active-theme-rams:before:bottom-0 active-theme-rams:before:block active-theme-rams:before:w-full active-theme-rams:before:bg-surface-pop',
        },
        hero: {
          base: 'border border-border-hero bg-surface-hero text-text-mono hover:bg-surface-hero/70 active:bg-surface-hero/50',
        },
        faint: {
          base: 'border border-border-muted-strong bg-surface-muted-faint text-text-muted hover:bg-surface-muted-faint/70 active:bg-surface-muted-faint/50',
        },
        link: { base: 'text-text-link underline' },
        unstyled: { base: 'p-0 text-left' },
      },
      soft: {
        true: { base: 'bg-surface-white-faint' },
      },
      block: {
        true: { base: 'flex w-full' },
        false: { base: 'inline-flex w-auto' },
      },
      justify: {
        true: { base: 'justify-between' },
      },
      hasChildren: {
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
        look: 'primary',
        soft: true,
        className:
          'text-text-body hover:text-text-mono active-theme-rams:text-text-primary active-theme-rams:hover:text-text-mono',
      },
      {
        slots: ['base'],
        look: 'hero',
        soft: true,
        className: 'text-text-body hover:text-text-mono',
      },
      {
        slots: ['base'],
        look: 'faint',
        soft: true,
        className: 'hover:bg-surface-muted-faint active:bg-surface-muted-faint',
      },
      {
        slots: ['iconBefore'],
        hasChildren: true,
        className: 'mr-1',
      },
      {
        slots: ['iconAfter'],
        hasChildren: true,
        className: 'ml-1',
      },
      {
        slots: ['iconBefore'],
        size: 'xlarge',
        hasChildren: true,
        className: 'mr-1.5',
      },
      {
        slots: ['iconAfter'],
        size: 'xlarge',
        hasChildren: true,
        className: 'ml-1.5',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
