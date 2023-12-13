import { NotEditable, component } from '@keystatic/core';

export const fonts = component({
  preview: () => (
    <NotEditable>
      <div>Fonts</div>
    </NotEditable>
  ),
  label: 'Fonts',
  schema: {},
});
