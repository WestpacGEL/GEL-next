import { NotEditable, component } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

export const fonts = component({
  preview: () => (
    <NotEditable>
      <div>Fonts</div>
    </NotEditable>
  ),
  label: 'Fonts',
  schema: {},
});

export const fontsKeystatic = block({
  ContentView: () => (
    <NotEditable>
      <div>Fonts</div>
    </NotEditable>
  ),
  label: 'Fonts',
  schema: {},
});
