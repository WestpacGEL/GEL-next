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
        hero: '',
        primary: '',
        success: '',
        info: '',
        warning: '',
        danger: '',
        pop: '',
        link: '',
        faint: '',
      },
      soft: {
        true: '',
      },
    },
    compoundVariants: [
      {
        color: 'hero',
        soft: false,
        className: 'border border-hero bg-hero text-white hover:bg-hero-300 active:bg-hero-200',
      },
      {
        color: 'primary',
        soft: false,
        className: 'border border-primary bg-primary text-white hover:bg-primary-300 active:bg-primary-200',
      },
      {
        color: 'success',
        soft: false,
        className: 'border border-success bg-success text-white hover:bg-success-300 active:bg-success-200',
      },
      {
        color: 'info',
        soft: false,
        className: 'border border-info bg-info text-white hover:bg-info-300 active:bg-info-200',
      },
      {
        color: 'warning',
        soft: false,
        className: 'border border-warning bg-warning text-white hover:bg-warning-300 active:bg-warning-200',
      },
      {
        color: 'danger',
        soft: false,
        className: 'border border-danger bg-danger text-white hover:bg-danger-300 active:bg-danger-200',
      },
      {
        color: 'pop',
        soft: false,
        className: 'border border-pop bg-pop text-white hover:bg-pop-300 active:bg-pop-200',
      },
      {
        color: 'link',
        soft: false,
        className: 'text-link underline',
      },
      {
        color: 'faint',
        soft: false,
        className: 'border border-border bg-light text-text hover:bg-white active:bg-white',
      },
      {
        color: 'hero',
        soft: true,
        className: 'border border-hero bg-white text-text hover:bg-hero-300 hover:text-white active:bg-hero-200',
      },
      {
        color: 'primary',
        soft: true,
        className:
          'border border-primary bg-white text-text hover:bg-primary-300 hover:text-white active:bg-primary-200',
      },
      {
        color: 'success',
        soft: true,
        className:
          'border border-success bg-white text-text hover:bg-success-300 hover:text-white active:bg-success-200',
      },
      {
        color: 'info',
        soft: true,
        className: 'border border-info bg-white text-text hover:bg-info-300 hover:text-white active:bg-info-200',
      },
      {
        color: 'warning',
        soft: true,
        className:
          'border border-warning bg-white text-text hover:bg-warning-300 hover:text-white active:bg-warning-200',
      },
      {
        color: 'danger',
        soft: true,
        className: 'border border-danger bg-white text-text hover:bg-danger-300 hover:text-white active:bg-danger-200',
      },
      {
        color: 'pop',
        soft: true,
        className: 'border border-pop bg-white text-text hover:bg-pop-300 hover:text-white active:bg-pop-200',
      },
      {
        color: 'faint',
        soft: true,
        className: 'border border-border bg-white text-text hover:bg-light active:bg-light',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
