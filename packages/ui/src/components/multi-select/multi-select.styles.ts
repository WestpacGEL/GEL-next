import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'relative flex flex-col gap-1',
    popover: 'shadow',
    label: 'block text-left text-sm font-medium text-gray-700',
    input: 'w-full outline-none',
    hint: 'typography-body-10 text-text-muted',
    searchInputWrapper: 'border-b border-b-border-muted-soft p-2',
    icon: 'h-5 w-5',
  },
});
