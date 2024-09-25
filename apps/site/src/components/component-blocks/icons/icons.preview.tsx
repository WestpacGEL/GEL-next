import { NotEditable, component } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

export const icons = component({
  preview: () => (
    <NotEditable>
      <div>All icons</div>
    </NotEditable>
  ),
  label: 'Icons',
  schema: {},
});

export const iconsKeystatic = block({
  ContentView: () => (
    <NotEditable>
      <div>All icons</div>
    </NotEditable>
  ),
  label: 'Icons',
  schema: {},
});
