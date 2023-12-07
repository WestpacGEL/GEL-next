import { component, fields } from '@keystatic/core';

export const imageCaption = component({
  label: 'Image Caption',
  preview: props => <>{props.fields.text.value || ''}</>,
  schema: {
    text: fields.text({
      label: 'Image Caption',
    }),
  },
});
