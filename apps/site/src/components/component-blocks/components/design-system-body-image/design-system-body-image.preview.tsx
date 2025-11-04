/* eslint-disable @next/next/no-img-element */
import { component, fields } from '@keystatic/core';

export const designSystemBodyImage = component({
  label: 'Body Image',
  preview: props => (
    <div className="flex flex-col gap-2">
      <div>
        <h4>Light</h4>
        <img src={props.fields.src.value || ''} alt={props.fields.alt.value || ''} />
      </div>
      {props.fields.darkModeSrc.value && (
        <div>
          <h4>Dark</h4>
          <img src={props.fields.darkModeSrc.value || ''} alt={props.fields.alt.value || ''} />
        </div>
      )}
    </div>
  ),
  schema: {
    title: fields.text({
      label: 'Image Caption',
    }),
    src: fields.url({
      label: 'Image URL',
      validation: { isRequired: true },
    }),
    darkModeSrc: fields.text({
      label: 'Dark mode: Image URL',
    }),
    alt: fields.text({
      label: 'Alt',
    }),
  },
});
