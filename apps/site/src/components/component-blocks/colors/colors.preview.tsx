import { NotEditable, component, fields } from '@keystatic/core';

export const colors = component({
  preview: props => (
    <NotEditable>
      <div>{`${props.fields.palette.value} color palette`}</div>
    </NotEditable>
  ),
  label: 'Colors',
  schema: {
    palette: fields.select({
      label: 'Color palette',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Reserved', value: 'reserved' },
      ],
      defaultValue: 'primary',
    }),
  },
});
