import { component, fields } from '@keystatic/core';

export const designSystemBodyImage = component({
  label: 'Body Image',
  preview: props => <img src={props.fields.src.value || ''} alt={props.fields.alt.value || ''} />,
  schema: {
    title: fields.text({
      label: 'Image Caption',
    }),
    src: fields.url({
      label: 'Image URL',
      validation: { isRequired: true },
    }),
    alt: fields.text({
      label: 'Alt',
    }),
  },
});
