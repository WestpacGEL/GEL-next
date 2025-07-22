import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      icon: 'absolute inset-0 m-auto',
      base: 'animate-[spin_0.7s_linear_infinite]',
      container: 'flex flex-col items-center',
      label: 'typography-body-9 mt-1.5',
    },
    variants: {
      size: {
        xsmall: { base: 'size-2' },
        small: { base: 'size-3' },
        medium: { base: 'size-4' },
        large: { base: 'size-15' },
        xlarge: { base: 'size-15' },
      },
      color: {
        success: { label: 'text-text-success' },
        info: { label: 'text-text-info' },
        warning: { label: 'text-text-warning' },
        danger: { label: 'text-text-danger' },
        system: { label: 'text-text-system-error' },
        white: { label: 'text-white[REPLACE_TOKEN]' },
        black: { label: 'text-black[REPLACE_TOKEN]' },
        background: { label: 'text-background[REPLACE_TOKEN]' },
        border: { label: 'text-border[REPLACE_TOKEN]' },
        borderDark: { label: 'text-borderDark[REPLACE_TOKEN]' },
        focus: { label: 'text-focus[REPLACE_TOKEN]' },
        heading: { label: 'text-text-heading' },
        hero: { label: 'text-text-hero' },
        light: { label: 'text-light[REPLACE_TOKEN]' },
        link: { label: 'text-text-link' },
        muted: { label: 'text-text-muted' },
        neutral: { label: 'text-neutral[REPLACE_TOKEN]' },
        pop: { label: 'text-pop[REPLACE_TOKEN]' },
        primary: { label: 'text-text-primary' },
        text: { label: 'text-text-body' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
