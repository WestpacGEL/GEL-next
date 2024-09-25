import { NotEditable, component } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

export const symbols = component({
  preview: () => (
    <NotEditable>
      <div>All Symbols</div>
    </NotEditable>
  ),
  label: 'Symbols',
  schema: {},
});

export const symbolsKeystatic = block({
  ContentView: () => (
    <NotEditable>
      <div>All Symbols</div>
    </NotEditable>
  ),
  label: 'Symbols',
  schema: {},
});
