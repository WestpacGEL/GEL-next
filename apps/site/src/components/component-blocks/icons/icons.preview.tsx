import { NotEditable, component } from '@keystatic/core';

export const icons = component({
  preview: () => (
    <NotEditable>
      <div>All icons</div>
    </NotEditable>
  ),
  label: 'Icons',
  schema: {},
});
