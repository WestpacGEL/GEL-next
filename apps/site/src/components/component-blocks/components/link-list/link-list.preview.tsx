import { component, fields } from '@keystatic/core';

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
