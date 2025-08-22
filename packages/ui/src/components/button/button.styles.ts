import { tv } from 'tailwind-variants';

/**
 * Current GEL design not using design tokens in some cases. Because of that, we need specify numeric values such as pb-[0.25rem] for spacing
 */
export const styles = tv(
  {
    slots: {
      base: 'items-center justify-center rounded border transition-[background] disabled:pointer-events-none disabled:opacity-50 group-first/add-on-before:h-auto group-first/add-on-before:rounded-r-none group-last/add-on-after:h-auto group-last/add-on-after:rounded-l-none',
      iconBefore: '',
      iconAfter: '',
      dropdown: 'ml-[0.4em]',
      text: 'overflow-hidden text-ellipsis',
    },
    variants: {
      size: {
        small: {
          base: 'active-theme-rams:before:h-[0.0625rem] typography-body-10 h-5 px-1.5',
        },
        medium: {
          base: 'active-theme-rams:before:h-0.5 typography-body-9 h-6 px-2',
        },
        large: {
          base: 'active-theme-rams:before:h-0.5 typography-body-9 h-7 px-2.5',
        },
        xlarge: {
          base: 'active-theme-rams:before:h-1 typography-body-8 h-8 px-3',
        },
      },
      look: {
        primary: {
          base: 'active-theme-rams:border-b-pop active-theme-rams:before:absolute active-theme-rams:before:bottom-0 active-theme-rams:before:block active-theme-rams:before:w-full active-theme-rams:before:bg-surface-pop relative border-border-primary bg-surface-primary text-text-mono hover:bg-surface-hover-primary active:bg-surface-active-primary',
        },
        hero: {
          base: 'border-border-hero bg-surface-hero text-text-mono hover:bg-surface-hover-hero active:bg-surface-active-hero',
        },
        faint: {
          base: 'border-border-muted-strong bg-surface-muted-pale text-text-muted hover:bg-surface-hover-mono active:bg-surface-active-mono',
        },
        link: { base: 'border-0 text-text-link underline hover:no-underline' },
        unstyled: { base: 'border-none p-0 text-left' },
      },
      soft: {
        true: {},
        false: {},
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
          'active-theme-rams:text-text-primary active-theme-rams:hover:text-text-mono border-border-primary bg-background-white-pale text-text-body hover:bg-surface-hover-primary-faint active:bg-surface-active-primary-faint',
      },
      {
        slots: ['base'],
        look: 'hero',
        soft: true,
        className:
          'border-border-hero bg-background-white-pale text-text-body hover:bg-surface-hover-hero-faint active:bg-surface-active-hero-faint',
      },
      {
        slots: ['base'],
        look: 'faint',
        soft: true,
        className: 'bg-background-white-pale hover:bg-surface-hover-muted-pale active:bg-surface-active-muted-pale',
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
