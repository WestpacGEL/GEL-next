import { NotEditable, component } from '@keystatic/core';

export const logos = component({
  preview: () => (
    <NotEditable>
      <div>All logos</div>
    </NotEditable>
  ),
  label: 'Logos',
  schema: {},
});
