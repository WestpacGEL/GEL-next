import { NotEditable, component, fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

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
        { label: 'Reserved for accessibility', value: 'reserved_for_accessibility' },
        { label: 'Data visualisation', value: 'data_visualisation' },
      ],
      defaultValue: 'primary',
    }),
  },
});

export const colorsKeystatic = block({
  ContentView: props => (
    <NotEditable>
      <div>{`${props.value.palette} color palette`}</div>
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
        { label: 'Reserved for accessibility', value: 'reserved_for_accessibility' },
        { label: 'Data visualisation', value: 'data_visualisation' },
      ],
      defaultValue: 'primary',
    }),
  },
});
