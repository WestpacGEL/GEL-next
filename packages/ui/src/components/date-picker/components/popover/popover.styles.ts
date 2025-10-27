import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    underlay: 'fixed inset-0',
    popover: 'bg-background-white-pale',
    header: '',
    headerLabel: '',
    closeButton: 'h-auto px-0',
  },
  variants: {
    showAsBottomSheet: {
      true: {
        underlay: 'animate-fadeIn bg-black/20',
        popover:
          'animate-slideUp !fixed inset-x-0 !top-auto !bottom-0 !left-0 overflow-auto rounded-t-3xl px-[8%] pb-3',
        header: 'border-b-border-muted-soft mx-[-8vw] flex items-center justify-between border-b px-3.5 py-2',
        headerLabel: 'typography-body-10 text-text-body',
      },
      false: {
        underlay: '',
        closeButton:
          'pointer-events-none absolute top-0 right-0 touch-none rounded-full opacity-0 focus:pointer-events-auto focus:touch-auto focus:opacity-100',
        headerLabel: 'hidden',
        popover:
          'animate-fadeIn border-border-muted-soft bg-background-white-pale absolute mt-1 scale-100 rounded-2xl border opacity-100 shadow-[0_5px_10px_rgba(0,0,0,0.2)]',
      },
    },
  },
});
