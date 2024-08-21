import { tv } from 'tailwind-variants';

/**
 * Current GEL design not using design tokens in some cases. Because of that, we need specify numeric values such as pb-[0.25rem] for spacing
 */
export const styles = tv(
  {
    slots: {
      base: 'items-center justify-center rounded leading-normal transition-[background] disabled:pointer-events-none disabled:opacity-50 group-first/add-on-before:rounded-r-none group-last/add-on-after:rounded-l-none',
      iconBefore: '',
      iconAfter: '',
      dropdown: 'ml-[0.4em]',
      text: 'overflow-hidden text-ellipsis',
    },
    variants: {
      size: {
        small: { base: 'typography-body-10 active-theme-rams:before:h-[0.0625rem] px-2 pb-1 pt-0.5' },
        medium: { base: 'typography-body-9 active-theme-rams:before:h-0.5 px-2 py-[0.3125rem]' },
        large: { base: 'typography-body-9 active-theme-rams:before:h-0.5 px-2.5 py-2' },
        xlarge: { base: 'typography-body-8 active-theme-rams:before:h-1 px-3 pb-2.5 pt-1.5' },
      },
      look: {
        primary: {
          base: 'border-primary bg-primary hover:bg-primary-70 active:bg-primary-50 active-theme-rams:border-b-pop active-theme-rams:before:absolute active-theme-rams:before:bottom-0 active-theme-rams:before:block active-theme-rams:before:w-full active-theme-rams:before:bg-pop relative border text-white',
        },
        hero: { base: 'border-hero bg-hero hover:bg-hero-70 active:bg-hero-50 border text-white' },
        faint: { base: 'border-border bg-light text-muted border hover:bg-white active:bg-white' },
        link: { base: 'text-link underline' },
      },
      soft: {
        true: { base: 'bg-white' },
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
        className: 'text-text active-theme-rams:text-primary active-theme-rams:hover:text-white hover:text-white',
      },
      {
        slots: ['base'],
        look: 'hero',
        soft: true,
        className: 'text-text hover:text-white',
      },
      {
        slots: ['base'],
        look: 'faint',
        soft: true,
        className: 'hover:bg-light active:bg-light',
      },
      {
        slots: ['iconBefore'],
        hasChildren: true,
        className: 'mr-[0.4em]',
      },
      {
        slots: ['iconAfter'],
        hasChildren: true,
        className: 'ml-[0.4em]',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
