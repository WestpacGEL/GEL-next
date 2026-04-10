import { Header } from '@tanstack/react-table';
import { AriaMenuProps } from 'react-aria';
import { MenuTriggerProps } from 'react-stately';

export type AdvancedTableMenuProps<T> = MenuTriggerProps & {
  filterVal?: string;
  header: Header<T, unknown>;
  onInputChange: (val: string) => void;
} & Omit<AriaMenuProps<object>, 'children'>;
