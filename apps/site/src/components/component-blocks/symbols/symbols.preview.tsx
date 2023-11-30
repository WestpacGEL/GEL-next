import { NotEditable, component } from '@keystatic/core';

export const symbols = component({
  preview: () => (
    <NotEditable>
      <div>All Symbols</div>
    </NotEditable>
  ),
  label: 'Symbols',
  schema: {},
});
