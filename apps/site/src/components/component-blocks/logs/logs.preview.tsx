import { NotEditable, component } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

import { DownloadButton } from './download-button.component';

export const logs = block({
  label: 'Logs',
  schema: {},
  ContentView: props => (
    <NotEditable>
      <DownloadButton />
    </NotEditable>
  ),
});
