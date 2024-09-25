import { component, fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

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

export const designSystemBodyImageKeystatic = block({
  label: 'Body Image',
  ContentView: props => <img src={props.value.src || ''} alt={props.value.alt || ''} />,
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
