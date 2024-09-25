import { NotEditable, component } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

export const logos = component({
  preview: () => (
    <NotEditable>
      <div>All logos</div>
    </NotEditable>
  ),
  label: 'Logos',
  schema: {},
});

export const logosKeystatic = block({
  ContentView: props => (
    <NotEditable>
      <div>All logos</div>
    </NotEditable>
  ),
  label: 'Logos',
  schema: {},
});
