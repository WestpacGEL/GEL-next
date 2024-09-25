import { component, fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

export const linkList = component({
  label: 'Link list',
  preview: ({ fields: { links } }) => {
    return (
      <ul>
        {links.elements.map(link => (
          <li key={link.key}>{link.fields.label.value}</li>
        ))}
      </ul>
    );
  },
  schema: {
    links: fields.array(
      fields.object({
        label: fields.text({
          label: 'Label',
        }),
        url: fields.url({
          label: 'URL',
        }),
        type: fields.select({
          label: 'target',
          options: [
            { label: '_blank', value: '_blank' },
            { label: '_self', value: '_self' },
          ],
          defaultValue: '_blank',
        }),
      }),
      {
        label: 'Link list',
        itemLabel: props => props.fields.label.value || '',
      },
    ),
  },
});

export const linkListKeystatic = block({
  label: 'Link list',
  ContentView: ({ value: { links } }) => {
    return (
      <ul>
        {links.map(link => (
          <li key={link.label}>{link.label}</li> //change from label later
        ))}
      </ul>
    );
  },
  schema: {
    links: fields.array(
      fields.object({
        label: fields.text({
          label: 'Label',
        }),
        url: fields.url({
          label: 'URL',
        }),
        type: fields.select({
          label: 'target',
          options: [
            { label: '_blank', value: '_blank' },
            { label: '_self', value: '_self' },
          ],
          defaultValue: '_blank',
        }),
      }),
      {
        label: 'Link list',
        itemLabel: props => props.fields.label.value || '',
      },
    ),
  },
});
