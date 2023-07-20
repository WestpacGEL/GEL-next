import { tv } from 'tailwind-variants';

/**
 * Current GEL design not using design tokens in some cases. Because of that, we need specify numeric values such as pb-[0.25rem] for spacing
 */
export const styles = tv(
  {
    base: 'inline-flex items-center gap-2 rounded leading-[1.5] transition-colors disabled:pointer-events-none disabled:opacity-50',
    variants: {
      size: {
        small: 'typography-body-10 px-2 pb-[0.25rem] pt-[0.1875rem]',
        medium: 'typography-body-9 px-2 py-[0.3125rem]',
        large: 'typography-body-9 px-[0.9375rem] py-[0.5rem]',
        xlarge: 'typography-body-8 px-3 pb-[0.625rem] pt-[0.5625rem]',
      },
      color: {
        hero: 'border border-hero bg-hero text-white hover:bg-hero-300 active:bg-hero-200',
        primary: 'border border-primary bg-primary text-white hover:bg-primary-300 active:bg-primary-200',
        link: 'text-link underline',
        faint: 'border border-border bg-light text-text hover:bg-white active:bg-white',
        'hero-soft': 'border border-hero bg-white text-text hover:bg-hero-300 hover:text-white active:bg-hero-200',
        'primary-soft':
          'border border-primary bg-white text-text hover:bg-primary-300 hover:text-white active:bg-primary-200',
        'faint-soft': 'border border-border bg-white text-text hover:bg-light active:bg-light',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
