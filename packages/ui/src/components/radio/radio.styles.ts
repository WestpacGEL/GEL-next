import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      optionWrapper: '',
      revealButton: 'text-text gap-1 px-0 no-underline hover:underline',
      buttonText: 'typography-body-10',
    },
    variants: {
      orientation: { horizontal: { optionWrapper: 'flex flex-wrap' }, vertical: { optionWrapper: 'flex flex-col' } },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
