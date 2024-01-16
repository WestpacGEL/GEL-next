import { NotEditable, component } from '@keystatic/core';

import { DownloadButton } from './download-button.component';

export const logs = component({
  preview: () => (
    <NotEditable>
      <DownloadButton />
    </NotEditable>
  ),
  label: 'Logs',
  schema: {},
});
