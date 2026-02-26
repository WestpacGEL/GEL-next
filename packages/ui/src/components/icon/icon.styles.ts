import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'inline-block transition-colors disabled:pointer-events-none disabled:opacity-50',
    variants: {
      size: {
        xsmall: 'min-h-2 min-w-2',
        small: 'min-h-3 min-w-3',
        medium: 'min-h-4 min-w-4',
        large: 'min-h-6 min-w-6',
        xlarge: 'min-h-8 min-w-8',
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
