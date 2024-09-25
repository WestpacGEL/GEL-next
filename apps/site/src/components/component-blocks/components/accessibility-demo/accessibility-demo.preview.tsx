import { component } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

// Apparently the document field is not possible be implemented on a component.
export const accessibilityDemo = component({
  chromeless: true,
  label: 'Accessibility Demo',
  preview: () => {
    return <h3>Accessibility demo placeholder</h3>;
  },
  schema: {},
});

export const accessibilityDemoKeystatic = block({
  // chromeless: true,  <--- apparently not an option in MDX
  label: 'Accessibility Demo',
  ContentView: () => {
    return <h3>Accessibility demo placeholder</h3>;
  },
  schema: {},
});
