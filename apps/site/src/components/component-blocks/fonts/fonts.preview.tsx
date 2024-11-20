import { NotEditable, component, fields } from '@keystatic/core';

export const fonts = component({
  preview: () => (
    <NotEditable>
      <div>Fonts</div>
    </NotEditable>
  ),
  label: 'Fonts',
  schema: {
    view: fields.select({
      label: 'Display Type',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Table', value: 'table' },
      ],
      defaultValue: 'default',
    }),
  },
});
