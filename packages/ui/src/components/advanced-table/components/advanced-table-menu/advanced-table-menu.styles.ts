import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    triggerButton: 'h-fit',
    groupHeaderReset: '**:inline **:[all:unset]', // need to overwrite the styles than get passed from the header when using flexRender
  },
});
