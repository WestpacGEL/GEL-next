import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'inline-flex items-center gap-2 rounded transition-colors disabled:pointer-events-none disabled:opacity-50',
    variants: {
      size: {
        small: 'typography-body-10 px-1',
        medium: 'typography-body-9 px-2 py-1',
        large: 'typography-body-9 px-3 py-1',
        xlarge: 'typography-body-8 px-4 py-2',
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
