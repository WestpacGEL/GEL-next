import { Item } from 'react-stately';

import { MultiSelectItemProps } from './multi-select.types.js';

// Exporting react-stately's Item with custom props/naming and Section with custom naming to align with other components
export const MultiSelectItem = Item as (props: MultiSelectItemProps) => JSX.Element;
export { Section as MultiSelectSection } from 'react-stately';

export { MultiSelect } from './multi-select.component.js';
export { type MultiSelectValue } from './multi-select.types.js';
