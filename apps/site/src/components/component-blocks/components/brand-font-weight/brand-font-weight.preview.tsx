import { NotEditable, component, fields } from '@keystatic/core';

export const brandFontWeight = component({
  preview: () => (
    <NotEditable>
      <div>Brand Font Weight</div>
    </NotEditable>
  ),
  label: 'Brand Font Weight',
  schema: {},
});
