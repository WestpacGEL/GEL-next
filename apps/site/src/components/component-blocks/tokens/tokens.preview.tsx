import { NotEditable, component, fields } from '@keystatic/core';

export const tokens = component({
  preview: props => (
    <NotEditable>
      <div>{`Tokens: ${props.fields.tokens.elements.map(token => token.fields.tokenName.value).join(', ')}`}</div>
    </NotEditable>
  ),
  label: 'Tokens Section',
  schema: {
    title: fields.text({ label: 'Title' }),
    tokens: fields.array(
      fields.object({
        tokenName: fields.text({ label: 'Token name', validation: { isRequired: true } }),
        description: fields.text({ label: 'Description', multiline: true }),
        fillColour: fields.text({ label: 'Fill colour (token)' }),
        strokeColour: fields.text({ label: 'Stroke colour (token)' }),
        textColour: fields.text({ label: 'Text colour for use with text circle (token)' }),
        circleType: fields.select({
          label: 'Circle type',
          options: [
            { label: 'Solid', value: 'solid' },
            { label: 'Border Colour', value: 'borderColour' },
            { label: 'Text Colour', value: 'textColour' },
            { label: 'Border', value: 'border' },
          ],
          defaultValue: 'solid',
        }),
        restricted: fields.checkbox({ label: 'Restricted token' }),
        new: fields.checkbox({ label: 'New token' }),
      }),
      { itemLabel: props => props.fields.tokenName.value },
    ),
  },
});
