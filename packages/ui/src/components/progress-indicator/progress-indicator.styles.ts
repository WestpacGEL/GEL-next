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
        success: { label: 'text-success' },
        info: { label: 'text-info' },
        warning: { label: 'text-warning' },
        danger: { label: 'text-danger' },
        system: { label: 'text-system' },
        white: { label: 'text-white' },
        black: { label: 'text-black' },
        background: { label: 'text-background' },
        border: { label: 'text-border' },
        borderDark: { label: 'text-borderDark' },
        focus: { label: 'text-focus' },
        heading: { label: 'text-heading' },
        hero: { label: 'text-hero' },
        light: { label: 'text-light' },
        link: { label: 'text-link' },
        muted: { label: 'text-muted' },
        neutral: { label: 'text-neutral' },
        pop: { label: 'text-pop' },
        primary: { label: 'text-primary' },
        text: { label: 'text-text' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
