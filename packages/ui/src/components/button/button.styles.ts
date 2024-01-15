import { tv } from 'tailwind-variants';

/**
 * Current GEL design not using design tokens in some cases. Because of that, we need specify numeric values such as pb-[0.25rem] for spacing
 */
export const styles = tv(
  {
    slots: {
      base: 'items-center justify-center rounded leading-[1.5] transition-[background] disabled:pointer-events-none disabled:opacity-50 group-[.add-on-after]:rounded-l-none group-[.add-on-before]:rounded-r-none',
      iconBefore: '',
      iconAfter: '',
      dropdown: 'ml-[0.4em]',
      text: 'overflow-hidden text-ellipsis',
    },
    variants: {
      size: {
        small: { base: 'typography-body-10 px-2 pb-[0.25rem] pt-0.5 active-theme-rams:before:h-[0.0625rem]' },
        medium: { base: 'typography-body-9 px-2 py-[0.3125rem] active-theme-rams:before:h-[0.125rem]' },
        large: { base: 'typography-body-9 px-2.5 py-[0.5rem] active-theme-rams:before:h-0.5' },
        xlarge: { base: 'typography-body-8 px-3 pb-[0.625rem] pt-1.5 active-theme-rams:before:h-[0.25rem]' },
      },
      look: {
        primary: {
          base: 'relative border border-primary bg-primary text-white hover:bg-primary-70 active:bg-primary-50 active-theme-rams:border-b-pop active-theme-rams:before:absolute active-theme-rams:before:bottom-0 active-theme-rams:before:block active-theme-rams:before:w-full active-theme-rams:before:bg-pop',
        },
        hero: { base: 'border border-hero bg-hero text-white hover:bg-hero-70 active:bg-hero-50' },
        faint: { base: 'border border-border bg-light text-muted hover:bg-white active:bg-white' },
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
        className: 'text-text hover:text-white active-theme-rams:text-primary active-theme-rams:hover:text-white',
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
