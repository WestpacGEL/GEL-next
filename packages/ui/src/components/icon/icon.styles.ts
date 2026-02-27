import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'inline-block transition-colors disabled:pointer-events-none disabled:opacity-50',
    variants: {
      size: {
        xsmall: 'size-2 min-h-2 min-w-2',
        small: 'size-3 min-h-3 min-w-3',
        medium: 'size-4 min-h-4 min-w-4',
        large: 'size-6 min-h-6 min-w-6',
        xlarge: 'size-8 min-h-8 min-w-8',
      },
      color: {
        success: 'text-success',
        info: 'text-info',
        warning: 'text-warning',
        danger: 'text-danger',
        system: 'text-system',
        white: 'text-white',
        black: 'text-black',
        background: 'text-background',
        border: 'text-border',
        borderDark: 'text-borderDark',
        focus: 'text-focus',
        heading: 'text-heading',
        hero: 'text-hero',
        light: 'text-light',
        link: 'text-link',
        muted: 'text-muted',
        neutral: 'text-neutral',
        pop: 'text-pop',
        primary: 'text-primary',
        text: 'text-text',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
