import { AriaMenuProps } from 'react-aria';

export type MenuListProps<T extends object> = Partial<Pick<AriaMenuProps<T>, 'children'>> &
  Omit<AriaMenuProps<T>, 'children'>;
