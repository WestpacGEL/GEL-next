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
        black: 'text-black[REPLACE_TOKEN]',
        background: 'text-background[REPLACE_TOKEN]',
        border: 'text-border[REPLACE_TOKEN]',
        borderDark: 'text-borderDark[REPLACE_TOKEN]',
        focus: 'text-focus[REPLACE_TOKEN]',
        heading: 'text-text-heading',
        hero: 'text-text-hero',
        light: 'text-light[REPLACE_TOKEN]',
        link: 'text-text-link',
        muted: 'text-text-muted',
        neutral: 'text-neutral[REPLACE_TOKEN]',
        pop: 'text-pop[REPLACE_TOKEN]',
        primary: 'text-text-primary',
        text: 'text-text-body',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
