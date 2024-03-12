import { Item } from 'react-stately';

import { AutocompleteItemProps } from './autocomplete-item.types.js';

export const AutocompleteItem = Item as unknown as { displayName: string } & (<T>(
  props: AutocompleteItemProps<T>,
) => JSX.Element);
