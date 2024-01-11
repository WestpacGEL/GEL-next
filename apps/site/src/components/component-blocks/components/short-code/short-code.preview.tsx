import { component, fields } from '@keystatic/core';

export const shortCode = component({
  label: 'Short code component',
  preview: ({ fields: { name } }) => {
    return <>{name.value || ''}</>;
  },
  schema: {
    name: fields.relationship({
      label: 'Short code',
      description: 'Short code',
      collection: 'shortCodes',
    }),
  },
});
