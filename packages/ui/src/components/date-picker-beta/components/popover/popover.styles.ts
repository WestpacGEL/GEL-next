import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      underlay: 'fixed inset-0',
      popover: 'bg-white',
      header: '',
      headerLabel: '',
      closeButton: 'flex items-center justify-center focus-outline',
    },
    variants: {
      showAsBottomSheet: {
        true: {
          underlay: 'animate-fadeIn bg-black/20',
          popover: '!fixed inset-x-0 !bottom-0 !left-0 !top-auto animate-slideUp overflow-auto rounded-t px-[8%] pb-3',
          header: 'mx-[-8vw] flex items-center justify-between border-b border-b-border px-3.5 py-2',
          headerLabel: 'typography-body-10 text-text',
          closeButton:
            'pointer-events-none touch-none rounded-full bg-white opacity-0 focus:pointer-events-auto focus:touch-auto focus:opacity-100',
        },
        false: {
          underlay: '',
          closeButton:
            'pointer-events-none absolute right-0 top-0 size-5 -translate-y-1/2 translate-x-1/2 touch-none rounded-full border border-border bg-white opacity-0 focus:pointer-events-auto focus:touch-auto focus:opacity-100',
          headerLabel: 'hidden',
          popover:
            'absolute my-1 scale-100 animate-fadeIn rounded border border-border bg-white opacity-100 shadow-[0_5px_10px_rgba(0,0,0,0.2)]',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
