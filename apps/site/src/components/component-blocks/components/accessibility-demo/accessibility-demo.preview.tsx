import { component, fields } from '@keystatic/core';

import { AccessibilityDemo } from '.';

// Apparently the document field is not possible be implemented on a component.
export const accessibilityDemo = component({
  label: 'Accessibility Demo',
  preview: ({ fields }) => {
    return <h1>Accessibility Demo</h1>;
    // return <AccessibilityDemo content={content.value} />;
  },
  schema: {
    // content: fields.document({
    //   label: 'Content',
    //   componentBlocks: {},
    //   formatting: {
    //     blockTypes: {
    //       blockquote: true,
    //       code: true,
    //     },
    //   },
    // }),
  },
});
