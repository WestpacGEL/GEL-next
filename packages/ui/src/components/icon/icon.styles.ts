import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'inline-block transition-colors disabled:pointer-events-none disabled:opacity-50',
    variants: {
      size: {
        xsmall: 'size-2',
        small: 'size-3',
        medium: 'size-4',
        large: 'size-6',
        xlarge: 'size-8',
      },
      color: {
        success: 'text-text-success',
        info: 'text-text-info',
        warning: 'text-text-warning',
        danger: 'text-text-danger',
        system: 'text-text-system-error',
        white: 'text-text-mono',
        black: 'text-black[REPLACE TOKEN]',
        background: 'text-background[REPLACE TOKEN]',
        border: 'text-border[REPLACE TOKEN]',
        borderDark: 'text-borderDark[REPLACE TOKEN]',
        focus: 'text-focus[REPLACE TOKEN]',
        heading: 'text-text-heading',
        hero: 'text-text-hero',
        light: 'text-light[REPLACE TOKEN]',
        link: 'text-text-link',
        muted: 'text-text-muted',
        neutral: 'text-neutral[REPLACE TOKEN]',
        pop: 'text-pop[REPLACE TOKEN]',
        primary: 'text-text-primary',
        text: 'text-text-body',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
