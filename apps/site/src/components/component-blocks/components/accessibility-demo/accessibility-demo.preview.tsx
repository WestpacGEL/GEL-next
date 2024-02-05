import { component } from '@keystatic/core';

// Apparently the document field is not possible be implemented on a component.
export const accessibilityDemo = component({
  chromeless: true,
  label: 'Accessibility Demo',
  preview: () => {
    return <h3>Accessibility demo placeholder</h3>;
  },
  schema: {},
});
