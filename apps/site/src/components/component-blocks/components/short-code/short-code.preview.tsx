import { component, fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

const shortCodeLabel = 'Short code'; // added because of eslint error

export const shortCode = component({
  label: 'Short code component',
  preview: ({ fields: { name } }) => {
    return <>{name.value || ''}</>;
  },
  schema: {
    name: fields.relationship({
      label: shortCodeLabel,
      description: shortCodeLabel,
      collection: 'shortCodes',
    }),
  },
});

export const shortCodeKeystatic = block({
  label: 'Short code component',
  ContentView: ({ value: { name } }) => {
    return <>{name || ''}</>;
  },
  schema: {
    name: fields.relationship({
      label: shortCodeLabel,
      description: shortCodeLabel,
      collection: 'shortCodes',
    }),
  },
});
