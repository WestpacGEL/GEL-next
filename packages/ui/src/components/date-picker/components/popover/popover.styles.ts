import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      underlay: 'fixed inset-0',
      popover: 'absolute bg-white',
    },
    variants: {
      showAsBottomSheet: {
        true: {
          underlay: 'animate-fadeIn bg-black/20',
          popover: 'inset-x-0 !left-0 !top-auto bottom-0 animate-slideUp px-[8%] pb-3',
        },
        false: {
          underlay: '',
          popover: 'scale-100 animate-fadeIn border border-border bg-white opacity-100 shadow-sm',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
