import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'rounded transition-colors disabled:pointer-events-none disabled:opacity-50',
    variants: {
      size: {
        xsmall: 'h-2 w-2',
        small: 'h-3 w-3',
        medium: 'h-4 w-4',
        large: 'h-6 w-6',
        xlarge: 'h-8 w-8',
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
