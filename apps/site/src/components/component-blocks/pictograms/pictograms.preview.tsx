import { NotEditable, component } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

export const pictograms = component({
  preview: () => (
    <NotEditable>
      <div>All pictograms</div>
    </NotEditable>
  ),
  label: 'Pictograms',
  schema: {},
});

export const pictogramsKeystatic = block({
  ContentView: () => (
    <NotEditable>
      <div>All pictograms</div>
    </NotEditable>
  ),
  label: 'Pictograms',
  schema: {},
});
