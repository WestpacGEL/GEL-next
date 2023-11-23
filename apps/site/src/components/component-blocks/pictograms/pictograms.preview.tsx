import { NotEditable, component } from '@keystatic/core';

export const pictograms = component({
  preview: () => (
    <NotEditable>
      <div>All pictograms</div>
    </NotEditable>
  ),
  label: 'Pictograms',
  schema: {},
});
